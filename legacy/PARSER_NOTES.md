PARSER NOTES
============

Summary
This project previously used a small custom Markdown parser (regex-based) inside `legacy_markdown_editor.html`. I replaced the custom parser with `markdown-it` (client-side) and `DOMPurify` for sanitization. The goal: improve CommonMark compliance, robust table/code handling, and reduce maintenance burden.
Files changed
 `legacy_markdown_editor.html` — now prefers local vendor copies (./vendor/) when present, otherwise uses CDN; initializes a `markdown-it` instance at load time, uses `DOMPurify` for sanitization when security is enabled, and integrates `highlight.js` for code-block syntax highlighting when available.

----------------------
1. Parsing

6. Syntax highlighting
   - The editor integrates `highlight.js` for fenced code block highlighting when the library is available (CDN or local vendor).
   - The markdown-it instance is configured to use `hljs` if present; otherwise code blocks fall back to showing escaped code.

7. Vendoring (local copies)
   - Two options are provided to download vendor files:
     1. Browser method: Use `vendor-download.html` to download the files through your browser
     2. PowerShell method: Rename `vendor-libs.txt` to `vendor-libs.ps1` and run it in PowerShell
   - The HTML loads `vendor/*.js` and `vendor/*.css` first (if present), then falls back to CDNs. This allows offline use after downloading the vendor files.
   - If `markdown-it` is available (loaded from CDN), the editor uses it to render Markdown to HTML. `markdown-it` supports tables, fenced code blocks, inline code, backslash escapes, and more by default.

The vendor downloaders and syntax-highlighting integration have been added. To vendor the libraries locally, choose one method:

Browser method:
1. Open `vendor-download.html` in your browser
2. Click "Download All Vendor Files"
3. Move the downloaded files into the `vendor/` folder

PowerShell method (Windows):
1. Rename `vendor-libs.txt` to `vendor-libs.ps1`
2. Open PowerShell in the project folder
3. Run `.\vendor-libs.ps1`

This will create a `vendor/` directory with the required files; reload the HTML file in your browser and it will prefer the local copies.
2. Security
   - When `securityEnabled` is true (default), the rendered HTML is sanitized with DOMPurify (`DOMPurify.sanitize(renderedHTML)`). DOMPurify is a battle-tested sanitizer and is preferred when available.
   - If DOMPurify is not available, the code falls back to the app's `Security.sanitize()` (a minimal text-escaping fallback).
   - When `securityEnabled` is false, the editor returns the raw `markdown-it` output (which may include HTML from the source). The UI shows a warning when toggling off security.

3. Escapes
   - `markdown-it` correctly handles backslash-escapes per CommonMark (e.g. `\*` produces a literal `*`).
   - If `markdown-it` is unavailable and the fallback parser runs, a token-protect/restore approach preserves backslash-escaped characters so they aren't interpreted as markup.

4. Tables & code
   - `markdown-it` handles tables and fenced code blocks robustly. The previous custom implementation included ad-hoc table parsing; this should be more reliable now.

5. Fallback
   - If `markdown-it` is not loaded for any reason (offline, CDN blocked), the existing fallback parser is used. It keeps previously added escape protection and table parsing logic.

How to test manually (quick)
----------------------------
- Open `legacy_markdown_editor.html` in a browser.
- Verify standard Markdown features still work: headings, lists, bold, italics, tables, fenced code blocks.
- Verify escapes: type `\*not bold\*` → preview should show `*not bold*` (asterisks visible, not italicized).
- Toggle security: click "Security: On" to turn it off and try raw HTML in the editor. With security off, raw HTML will be rendered; with security on, it will be sanitized.
- Run the "Tests" toolbar button to see a small set of parser smoke tests in a new tab.

Notes / Next steps
------------------
- If you prefer local dependencies (no CDN), we can vendor `markdown-it` and `dompurify` into the project and load local copies.
- Optionally wire syntax highlighting for code blocks (e.g., highlight.js or prism) — would require loading an additional script and hooking into `markdown-it` renderer for code fences.

If you'd like, I can also: vendor the libs locally, add an integration test file, or enable client-side syntax highlighting for fenced code blocks.