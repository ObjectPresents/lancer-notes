# Lancer Notes Structured Text (.st) Format Specification
Version: 1.0  
Maintainer: Lancer Notes Team

---

## 1. Overview

Lancer Notes Structured Text (LNST) is a Markdown-based authoring format tailored for the Lancer Notes editor. It combines core Markdown with optional extensions so writers can start from familiar syntax while opting into richer behavior as needed.

`.st` files can be authored in any Markdown environment, but unlocking the full experience requires the Lancer Notes parser with relevant extensions enabled.

---

## 2. Core Principles

1. **Markdown-first authoring** – Every LNST document must remain valid, readable Markdown.
2. **Opt-in enhancements** – Advanced features are exposed through explicit extensions and can be toggled per workspace.
3. **Predictable rendering** – The preview pane and exported HTML must stay byte-identical for supported constructs.
4. **Backwards compatibility** – Future revisions must not break existing `.st` files without providing a migration path.

---

## 3. File Metadata

- **Extension**: `.st`
- **MIME type**: `text/x-lancer-structured-text`
- **Encoding**: UTF-8
- **Recommended editor settings**: LF line endings, spaces for indentation

---

## 4. Required Feature Set

LNST documents must support the following baseline behaviors (mirroring the current Lancer Notes parser).

### 4.1 Headings & Separators
- ATX headings `#`–`######`
- Horizontal rules: `---`, `***`, or `___` on their own line

### 4.2 Paragraph & Line Handling
- Single newlines become HTML `<br>` elements
- Consecutive blank lines create new paragraph wrappers (`<p>…</p>`)

### 4.3 Inline Styling
- Bold: `**strong**`
- Italic: `*emphasis*`
- Strikethrough: `~~deleted~~`
- Inline code: `` `code` ``

### 4.4 Links & Autolinking
- Standard Markdown links: `[label](url)`
- Automatic URL and email linking for bare text

### 4.5 Images
- Standard syntax: `![alt](src)`
- Optional position modifier `{left}`, `{right}`, `{center}`
- Images with alt/title text render an info badge inside the preview

### 4.6 Lists
- Unordered lists: `-`, `*`, or `+`
- Ordered lists: `1.`, `2.`, etc.
- Task items `- [ ]` / `- [x]` become interactive checkboxes when Extended Markdown or GFM extension is enabled

### 4.7 Blockquotes
- Nested blockquotes using repeated `>` characters
- Headings inside blockquotes render with their proper levels

### 4.8 Code Blocks
- Fenced code blocks ``` ``` with optional language info string
- Syntax highlighting via PrismJS when the Syntax Highlighter extension is enabled

### 4.9 Emoji Shortcodes
- `:emoji_name:` resolves using the built-in emoji map

---

## 5. Extended Markdown Features (Optional)

When the **Extended Markdown** extension is enabled (flag stored in `localStorage` under `ext-extended-markdown`), the parser activates:

1. Superscript & Subscript  
   - Superscript: `x^2^`  
   - Subscript: `H~2~O`
2. Highlighted Text  
   - Emphasize text with `==important==` (rendered as `<mark>`)
3. Footnotes  
   - Definition: `[^id]: text` with optional indented continuations  
   - Reference: `… like this[^id]`  
   - Automatically compiled into a `<section class="footnotes"><ol>…</ol></section>` block
4. Definition Lists  
   - `Term` followed by lines starting with `: description`
5. Interactive Task Lists  
   - `- [ ]` and `- [x]` become interactive checkboxes (shared with GFM)
6. Enhanced Table Cell Formatting  
   - Inline formatting (emphasis, code, links, superscript, subscript, highlights) inside table cells

---

## 6. GitHub Flavored Markdown (GFM) Features (Optional)

When the **GFM** extension is enabled (`localStorage` key `ext-gfm`), the following behavior is mirrored for compatibility:

- Task list items behave identically to Extended Markdown interactive checkboxes
- Tables accept the same alignment and pipe syntax as GitHub
- Compatibility for users bringing existing `.md` documents from GitHub is maintained

---

## 7. Table Formatting Enhancements

- Tables follow standard pipe-table syntax
- Alignment is inferred from separator-row colons
- Optional metadata comment precedes a table to toggle classes, for example:
  ```markdown
  <!--table-format: striped, header-highlight-->
  | Col 1 | Col 2 |
  |:------|------:|
  | A     | B     |
  ```
- Supported flags: `striped`, `no-borders`, `header-highlight`

---

## 8. Image Badges & Positioning

- `{left|right|center}` appends positioning classes for floated images
- Images with descriptive text render an info badge (`i`) exposing metadata
- Clearing helpers `---clear---` or `+++clear+++` reset surrounding flow

---

## 9. Footnote Rendering Details

- Footnote references output superscripted links (`<sup>`)
- Definitions render with back-reference arrows (`↩`)
- Inline formatting inside footnotes is preserved

---

## 10. Escape Handling

- Special characters escaped using the placeholder syntax `@@ESCAPED:hex@@` during parsing are restored in a post-processing pass

---

## 11. Authoring Guidelines

1. Prefer semantic Markdown over raw HTML whenever possible.
2. Keep optional extensions documented at the top of collaborative documents.
3. Avoid mixing incompatible spacing styles; use spaces for indentation.
4. Disable experimental extensions before exporting to third-party platforms.
5. Validate documents in both editor and preview modes prior to publishing.

---

## 12. Example Document

~~~markdown
# Mission Overview {.st}

Commander,

This briefing uses the LNST format. Review the quick stats below.

| System     | Status  |
|:-----------|--------:|
| Reactor    | Nominal |
| Flux Cores | Warning |

Support crew tasks:

- [x] Upload navigation patch
- [ ] Recalibrate targeting array

See reference specs[^spec] and chem formula H~2~O.

```js
console.log('Diagnostics running...');
```
~~~

---

## 13. Compatibility Notes

- Legacy Markdown editors ignore metadata comments and custom classes while preserving content.
- Export pipelines should retain the `.st` extension to signal extended feature usage.
- Future LNST updates must remain backwards compatible or ship with an automated migration script.

---

## 14. Roadmap Considerations

- Callout blocks (e.g., `:::warning`)
- Inline math via KaTeX
- Diagram embedding (Mermaid, PlantUML)

These features are out of scope for version 1.0 but remain candidates for future extensions.

---

## 15. Change Log

- **1.0** – Initial specification derived from Lancer Notes v2.2 parser capabilities.

---

[^spec]: Internal systems specification outlining ship diagnostics.