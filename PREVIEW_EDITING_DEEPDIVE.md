# Preview Editing — Deep Dive
Last updated: November 25, 2025

This document explains how the "preview editing" (live preview / WYSIWYG-ish) functionality works in Lancer Notes, why building a robust preview editor is challenging, common issues encountered, and practical mitigations and implementation guidance.

**Audience:** Developers, integrators, and maintainers working on the editor's preview pipeline.
---

## 1. What is Preview Editing?
Preview editing describes the ability for a user to edit source Markdown (or other source text) and simultaneously see a rendered HTML preview that updates as they type — often with features that let users edit within the preview or have the preview and source synchronized (cursor position, selection, scroll, and structural edits).

Goals:

- Low-latency, accurate rendering of source as HTML
- Good UX: selection mapping, scroll sync, and minimal visual jitter
- Safety: sanitized output and safe execution of embedded content
- Extensibility: support for plugins, code blocks, math, diagrams

Common flavors:
- Source pane + live preview (dual-pane) — canonical for Markdown editors
- WYSIWYG / contenteditable (single DOM) — edits directly apply to rendered DOM
- Hybrid: source editing with inline editable widgets in the preview

---

## 2. High-level Architecture
Key components:

- Input layer: `textarea` or advanced editor (CodeMirror, Monaco, contenteditable)
- Parser: converts source text → AST (e.g., remark, markdown-it)
- Renderer: AST → sanitized HTML fragments
- Diff/patcher: updates the preview DOM efficiently (full replace vs incremental patches)
- Highlighting engine: code blocks via Prism.js or highlight.js
- Scroll &amp; selection sync: map source lines/offsets → DOM nodes and vice versa
- Event system: change events, debouncing, worker communication
- Sandbox layer: iframe or Shadow DOM to isolate CSS &amp; scripts
- Persistence: localStorage / file operations

Data flow (simple):
1. User types -&gt; input event emitted
2. Debounced pipeline sends text to worker/parser
3. Parser -&gt; AST -&gt; renderer -&gt; HTML string
4. Main thread receives HTML -&gt; patch preview DOM
5. Optional: highlight code blocks, attach copy buttons
6. Sync scroll &amp; cursor mapping

---

## 3. Two Primary Implementation Strategies
1) Rendered Preview (Dual-Pane, Source-Canonical)

- Source editor (textarea/CodeMirror) is authoritative
- Preview is read-only rendered HTML
- Pros: simpler mapping from source to preview, easier undo/redo, safer isolation
- Cons: editing directly in preview is not possible (without extra tooling)

2) WYSIWYG / Mirrored DOM (Preview-Editable)
- Rendered DOM itself becomes editable (contenteditable or specialized editors)
- Pros: direct manipulation for users (drag-drop images, table UI)
- Cons: extremely difficult to keep source canonical and map edits back to Markdown reliably

Most Markdown editors adopt approach (1) plus a handful of interactive widgets in preview.
---

## 4. Why Building a Good Preview Editor Is Hard
1. Source ↔ DOM Mapping
- Markdown is higher-level and not 1:1 with HTML; mapping source positions (line/column) to DOM nodes is complex.
- E.g., a single paragraph in Markdown can be split across multiple DOM nodes when decorations exist (links, emphasis, code, inline HTML).
- Mapping must handle edits that change AST shape and node offsets.

1. Incremental Updates &amp; Performance
- Re-rendering the entire preview on every keystroke is slow for large documents.
- Diffing HTML strings and applying DOM patches safely and fast is nontrivial.
- Creating and tearing down many DOM nodes causes layout thrashing.

1. Selection &amp; Cursor Mapping
- If preview editing allows editing with the preview (or you want cursor mapping to highlight the source position), you need a mapping from caret/selection in DOM to source offset.
- Selection mapping must be stable across renders and resilient to changes caused by sanitizers, HTML normalizers, or browser quirks.

1. Asynchronous Content
- Images, network embeds, and Math rendering (KaTeX/MathJax) are asynchronous and can change layout after initial render, breaking scroll sync.

1. Security (XSS)
- Rendering arbitrary HTML/embedded content is a security risk — must run HTML through an HTML sanitizer (DOMPurify) and possibly sandbox it (iframe).

1. CSS Isolation &amp; Styling
- Preview HTML must look correct while not being affected by app styles; conversely, preview CSS must not leak into the app.
- Shadow DOM or iframe isolation adds complexity for integration (fonts, scroll behavior, selection mapping).

1. Plugin &amp; Extension Interoperability
- Plugins can introduce custom inline widgets, raw HTML, scripts, or CSS — each increases complexity in parsing and rendering, and must be sandboxed.

1. Undo/Redo Consistency
- If preview edits are allowed, reconciling undo stacks between source editor and rendered view is hard.

1. Browser Differences
- DOM normalization and text node splitting differ across browsers; robust systems must be tolerant.

1. Accessibility
- Maintaining correct semantic HTML, keyboard navigation, and screen reader behavior while giving a modern editing experience is tough.

---

## 5. Common Issues and Practical Mitigations
Issue: Full re-render is slow on large files

- Mitigation:
  - Use Web Worker for parsing + rendering to avoid blocking UI
  - Debounce input (e.g., 150–400ms) but keep special-case immediate updates for small edits
  - Incremental parsing (AST diff) when possible (remark incremental plugins)
  - Virtual DOM or fine-grained DOM patching instead of innerHTML replacement

Issue: Scroll sync jumps when preview reflows (images, math)

- Mitigation:
  - Use a stable mapping approach (line-based anchors or block IDs)
  - Insert invisible anchors with `data-line` attributes during render
  - Defer scroll alignment until crucial async content finishes (image onload, MathJax typeset event)
  - Optionally, use `IntersectionObserver` to track anchors and map positions dynamically

Issue: Selection mapping broken after render

- Mitigation:
  - Use markers in AST rendering to record offsets (unique IDs on inline nodes)
  - Map source caret offset to nearest marker/anchor, then compute DOM selection
  - Preserve markers across incremental updates, or re-map intelligently

Issue: Security (XSS) concerns

- Mitigation:
  - Sanitize all rendered HTML with a robust library (DOMPurify)
  - Prefer rendering in a sandboxed iframe if user-provided HTML is allowed
  - Disallow inline <script> and unsafe attributes

Issue: Styling leaks and conflicts
- Mitigation:
  - Render preview into a Shadow DOM or sandboxed iframe to isolate styles
  - Keep font declarations consistent by loading fonts in the preview context
  - If using an iframe, make sure to sync theme (light/dark) via postMessage or CSS variables

Issue: Asynchronous renders (MathJax, KaTeX, Mermaid)
- Mitigation:
  - Perform these transforms in a worker when possible (Mermaid supports headless SVG rendering server-side)
  - Hook into completion events (e.g., MathJax `typesetPromise`) and re-run scroll sync
  - Reserve placeholder heights to reduce layout shift

Issue: Code highlighting performance
- Mitigation:
  - Use Prism.js lazy-loading for language components
  - Highlight only visible code blocks (viewport detection)
  - Cache highlighted output for unchanged code blocks

Issue: Undo/redo divergence when editing both panes
- Mitigation:
  - Maintain a single source-of-truth (usually the source editor) for undo/redo; accept limited preview edits only through controlled UI
  - If preview edits must be supported, implement a mapping layer that emits canonical source edits into the source editor's undo stack
---

## 6. Implementation Patterns & Best Practices
1. Keep the source editor as the canonical state (single source of truth).
2. Use a parser that provides an AST (remark, markdown-it with plugins) to enable structured rendering.
3. Run parsing & heavy transforms inside Web Workers.
4. Produce HTML with stable block identifiers (e.g., `...`)
5. Render into an isolated context (Shadow DOM or sandboxed iframe) to avoid CSS leakage.
6. Apply DOM patches rather than full innerHTML replacements whenever feasible.
7. Attach copy buttons and interactive controls after the primary HTML is inserted to minimize reflows.
8. Debounce input but provide modes (instant vs delayed) under user control.
9. Provide fallbacks for large files (disable live preview or switch to low-fidelity mode).
10. Instrument performance metrics and surface telemetry during development (not production telemetry to respect privacy).

---

## 7. Engineering Checklist (Implementation Roadmap)
- [ ] Choose canonical editor (textarea / CodeMirror / Monaco)
- [ ] Wire input events with debounced worker pipeline
- [ ] Implement worker-based parser + renderer
- [ ] Return HTML with stable `data-*` anchors for mapping
- [ ] Implement DOM patcher (or use virtual DOM) to update preview
- [ ] Integrate code highlighting lazily (Prism lazy load)
- [ ] Add copy buttons and header UI for code blocks
- [ ] Implement scroll sync using anchors + IntersectionObserver
- [ ] Add image onload and async-content handlers to re-align scroll
- [ ] Sanitize HTML with DOMPurify before insertion
- [ ] Provide safe sandboxing strategy (iframe) for raw HTML/embeds
- [ ] Add tests for mapping, scroll sync, selection mapping, and performance
- [ ] Expose debug mode to visualize anchors and diffs

---

## 8. Example Pipeline (Simplified)
Pseudo-code (main thread + worker):

Main thread:
```
onInput(text) {
  lastUserCursor = editor.getCursor();
  scheduleWorkerParse(text);
}

scheduleWorkerParse(text) {
  debounce(() =&gt; worker.postMessage({ type: 'parse', text }));
}

worker.onmessage = (msg) =&gt; {
  if (msg.type === 'rendered') {
    const { html, anchors } = msg.payload;
    previewContainer.innerHTML = html; // sanitized by worker or main thread
    attachCodeButtons(previewContainer);
    applyHighlights(previewContainer);
    restoreSelection(lastUserCursor, anchors);
    syncScroll(editor, previewContainer, anchors);
  }
}

```Worker:
```
onmessage = (msg) =&gt; {
  if (msg.type === 'parse') {
    const ast = parseMarkdown(msg.text);
    const html = renderHTML(ast, { includeAnchors: true });
    // Optionally sanitize here, or send back and sanitize in main thread
    postMessage({ type: 'rendered', payload: { html } });
  }
}

```Mapping strategy:
- Render each top-level block with a stable data attribute referencing its start-line/offset
- Use `data-block-id` and `data-line-start` so the preview can be mapped back to the source

---

## 9. Selection & Cursor Mapping Techniques
- Line-based mapping (good enough for many editors): map caret to nearest block anchor and then search within block text to compute offset
- Token-based mapping: embed markers for tokens in rendered HTML for fine-grained mapping (requires preserving markers across rerenders)
- Range mapping with unique IDs for inline nodes (e.g., anchors on inline emphasis, links)
- Strategies for preserving mapping:
  - Keep block IDs stable between renders when content of block isn't changed
  - For changed blocks, compute a diff and try to reuse inner anchors where possible
---

## 10. Testing & Debugging Tips
- Create test documents that stress edge cases: very long lines, deeply nested lists, tables, HTML blocks, images, embed tags
- Measure render time and memory usage for large documents
- Use dev-mode to render anchors and show mapping overlays
- Test on various browsers and devices — especially Safari which often differs in text node handling
- Log parse AST diffs to help identify where mappings diverge
- Mock slow async resources (images, MathJax) to validate scroll sync behavior

---

## 11. Libraries & Tools Worth Considering
- Parser: `remark` (unified) or `markdown-it` or `marked`
- Sanitizer: `DOMPurify`
- Highlighting: `Prism.js` (already in use), `highlight.js`
- WYSIWYG foundations: `ProseMirror` / `TipTap` if full WYSIWYG desired
- Virtual DOM/patchers: `snabbdom`, `virtual-dom`, `morphdom`
- Math rendering: `KaTeX`, `MathJax` (KaTeX faster/less features)
- Diagram engines: `Mermaid` (consider pre-render or off-main-thread rendering)

---

## 12. Performance Budget Recommendations
- Target input-to-render latency < 200–300ms for typical small edits
- Use web worker parsing if render costs exceed ~10–20ms
- For files > 1–2MB consider low-fidelity mode (no highlights, simplified rendering)
- Cache previous render outputs per block to avoid re-highlighting unchanged code

---

## 13. Real-World Trade-offs & Recommendations
- Keep source as the single source of truth — easier to reason about and revert
- Prefer dual-pane with rich interactive widgets in the preview rather than full WYSIWYG
- Accept that perfect selection/cursor mapping is expensive — document limitations and provide clear UX fallbacks
- Invest in instrumentation early — debugging preview mapping without telemetry and anchors is painful

---

## 14. Known Limitations
- Perfect round-trip from preview edits to Markdown is not always possible for arbitrary HTML
- Some complex plugins (embedded scripts, custom HTML) require sandboxing and may not round-trip
- Browser differences may cause occasional selection mapping drift
- Large documents need explicit performance modes

---

## 15. Summary
Preview editing is deceptively complex because it combines parsing, rendering, incremental updates, security, UI mapping, and asynchronous content handling. The robust approach for Markdown editors is:
- Keep the source as canonical
- Use worker-based parsing and rendering
- Provide stable anchors and DOM patching strategies
- Sanitize and sandbox HTML
- Provide controlled preview-editing widgets rather than full preview-side arbitrary editing

This document should serve as a reference while implementing, debugging, and extending Lancer Notes' preview pipeline