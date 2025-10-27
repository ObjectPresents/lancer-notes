# Markdown Editor Documentation

## Overview
A lightweight markdown editor with real-time preview, syntax highlighting, and security features. Built with vanilla JavaScript and modern browser APIs.

## Features

### Core Features
- Real-time markdown preview
- Code syntax highlighting
- Table support
- Security (XSS protection)
- Local file vendoring
- Backslash character escaping

### Toolbar Actions
- Text formatting (bold, italic, strikethrough)
- Headers (h1-h3)
- Lists (bullet and numbered)
- Code blocks
- Links and images
- Tables
- View modes (split/editor/preview)

## Parser System

### Primary Parser (markdown-it)
```javascript
function initMarkdownIt() {
    md = window.markdownit({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
            // Uses highlight.js for code syntax highlighting
        }
    });
}
```

### Fallback Parser
- Built-in regex-based parser
- Used when markdown-it is unavailable
- Supports basic markdown syntax
- Includes escape character handling

### Security Features

#### Security Module
```javascript
const Security = {
    sanitize: function(html) { /* ... */ },
    allowedTags: new Set([/* ... */]),
    parseSafeHtml: function(html) { /* ... */ },
    isValidAttribute: function(name, value) { /* ... */ },
    isValidUrl: function(url) { /* ... */ }
};
```

- XSS protection enabled by default
- Configurable allowed HTML tags
- URL validation for links and images
- DOMPurify integration for robust sanitization

### Escape Handling
- Supports backslash escaping: \*, \`, etc.
- Preserves escaped characters in preview
- Token-based protection system:
  ```javascript
  const protect = (mdText) => mdText.replace(/\\([`*_{}\[\]()#+\-.!>\|~\\])/g, ...);
  const restore = (html) => html.replace(/::ESC(\d+)::/g, ...);
  ```

## Local Vendoring

### Vendor Files
The following libraries can be loaded locally from the `vendor/` directory:
- markdown-it.min.js
- purify.min.js (DOMPurify)
- highlight.min.js
- highlight.default.min.css

### Vendoring Script
Use `vendor-libs.ps1` to download vendor files:
```powershell
.\vendor-libs.ps1
```

The HTML will automatically prefer local vendor files when available.

## Testing

### Built-in Tests
Access via the "Tests" button in the toolbar. Tests cover:
- Escaped asterisks
- Inline escaped backticks
- Mixed formatting
- Tables with escaped characters

Example test case:
```javascript
{ 
    name: 'escaped asterisk', 
    input: '\\*not bold\\*' 
}
```

## File Operations

### Supported Operations
- New file (Ctrl+N)
- Open file (Ctrl+O)
- Save file (Ctrl+S)
- Auto file type (.md)

### File Handling
```javascript
function saveFile() {
    const blob = new Blob([content], { type: 'text/markdown' });
    // Uses HTML5 download API
}
```

## View Modes

### Available Modes
1. Split View (default)
   - Editor and preview side by side
   - Resizable split pane
2. Editor Only
   - Full width editor
3. Preview Only
   - Full width preview

### Pane Management
```javascript
function setViewMode(mode) {
    // Modes: 'split', 'editor', 'preview'
    container.classList.remove('editor-only', 'preview-only', 'single-pane');
    // ... mode-specific setup
}
```

## Version Information

### Current Version
- Version: 1.3.2
- Status: Active maintenance
- End-of-support notice for v1.x series

### Update Checker
- Automatic check on load
- Manual check via toolbar
- Uses GitHub API to check latest release

## Keyboard Shortcuts

### Editor Shortcuts
| Shortcut | Action |
|----------|--------|
| Ctrl+N | New file |
| Ctrl+O | Open file |
| Ctrl+S | Save file |
| Ctrl+Z | Undo |
| Ctrl+Shift+Z | Redo |
| Ctrl+B | Bold |
| Ctrl+I | Italic |

## Implementation Notes

### Progressive Enhancement
- Falls back to basic parser if markdown-it unavailable
- Falls back to basic sanitizer if DOMPurify unavailable
- CDN fallback if vendor files missing

### Performance
- Debounced preview updates
- Efficient undo/redo stack (max 50 states)
- Optimized regex patterns
- Lazy-loaded syntax highlighting

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support
- Uses standard Web APIs:
  - Blob
  - URL
  - File
  - classList
  - querySelector
  - localStorage (for future features)