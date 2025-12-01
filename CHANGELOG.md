# Lancer Notes v2.2.3 - Changelog

## Version 2.2.3 (November 27, 2025)

### 🐛 Bug Fixes

#### Theme Dialog
- **Fixed auto-opening on page load** - Removed duplicate `display:flex` property that was overriding `display:none`, causing the theme dialog to appear automatically when opening the page. Dialog now correctly remains hidden until the user clicks the theme button.

---

## Version 2.2.2* (November 25, 2025)

### 🎨 Theme & UI Improvements

#### Theme Dialog Layout Fixes
- **Fixed oversized dialog width** - Changed from fixed 1760px to responsive `min(1400px, 92vw)`
- **Improved positioning** - Centered dialog properly using `translate(-50%, -50%)`
- **Enhanced flex layout** - Added proper flex properties to all containers for better responsiveness
- **Fixed scrolling behavior** - Added independent scrolling for options column and preview area
- **Added responsive breakpoints** - New breakpoints at 1200px, 768px, and improved 540px mobile layout
- **Separated action bar** - Footer buttons now properly positioned with border and background
- **Better touch support** - Improved mobile experience with adjusted padding and sizing
- **Fixed toolbar flexibility** - Prevented toolbar squishing with `flex-shrink: 0`

### 💻 Syntax Highlighting Enhancements

#### Local Syntax Highlighting Implementation
- **Expanded language support** - 40+ programming languages with intelligent alias mapping
- **Added copy to clipboard** - One-click code copying with visual feedback (checkmark animation)
- **Enhanced code block UI** - Professional header with language badge and copy button
- **Beautiful color schemes** - Light mode and dark mode syntax highlighting colors
  - Light: Red keywords, green strings, purple functions
  - Dark: Bright red, teal, light purple with OLED optimization
- **Improved code styling** - Monospace fonts (Fira Code, Consolas, Monaco) with proper spacing
- **Custom scrollbars** - Styled horizontal scrollbars for code blocks
- **Inline code enhancement** - Better background highlighting and contrast

#### Supported Languages
- **Scripting**: JavaScript, TypeScript, JSX/TSX, Python, Ruby, PHP, Perl, Go, Rust
- **Shell**: Bash, Zsh, PowerShell
- **Markup**: HTML, XML, SVG, Markdown
- **Styling**: CSS, SCSS, SASS, LESS
- **Data**: JSON, YAML, TOML, INI, SQL
- **Compiled**: Java, C#, C, C++, Swift, Kotlin
- **Templating**: Handlebars, and more

#### Code Block Features
- Language identification badge
- Copy button with instant feedback
- Syntax highlighting via Prism.js
- Status bar notifications on copy
- Proper line spacing and readability
- Dark/light mode support

### ⚙️ Settings System (Verified Complete)

#### Core Functionality
- ✅ Settings persistence with localStorage
- ✅ Auto-load on application startup
- ✅ Auto-apply settings to UI/editor
- ✅ Settings export to JSON file
- ✅ Settings import from JSON file
- ✅ Factory reset with full cleanup

#### Settings Categories
- **General**: Theme (Light/Dark/Auto), Auto-save, Default save location, Developer mode
- **Editor**: Font size, Font family, Editor font, Font weight, Font style, Line height, Google Fonts integration
- **Preview**: Live preview toggle, Preview editing, Preview word wrap
- **Data & Privacy**: Export/Import, Search history clearing, Full reset
- **Extensions**: File access, Network access, Clipboard access, Theme access permissions
- **About**: Version info, Build details, Changelog display

### 📝 Markdown Features

#### Supported Markdown Syntax
- Headers (H1-H6)
- Bold, Italic, Strikethrough
- Links and autolinks
- Images with positioning
- Code blocks with syntax highlighting
- Inline code
- Lists (ordered and unordered)
- Task lists
- Tables with formatting options
- Blockquotes
- Horizontal rules
- Definition lists (Extended Markdown)
- Superscript and subscript (Extended Markdown)
- Footnotes (Extended Markdown)

### 🔧 Editor Capabilities

#### Core Features
- Split-view, editor-only, and preview-only modes
- Live preview with synchronized scrolling
- Find and replace with regex support
- Undo/redo history (unlimited)
- Auto-save with localStorage fallback
- Word wrap toggle
- Line numbers (toggle via settings)
- Keyboard shortcuts for view modes (Ctrl+1, Ctrl+2, Ctrl+3)

#### File Operations
- Open files (File System Access API with fallback)
- Save files (with disk and localStorage support)
- Save As functionality
- Auto-save every 30 seconds (configurable)
- Recent files management

### 🎯 Extension System

#### Built-in Extensions
- **Extended Markdown** - Task lists, definition lists, footnotes, superscript, subscript
- **GitHub Flavored Markdown** - Tables, strikethrough, task lists, autolinks
- **Syntax Highlighter** - Advanced code highlighting with 40+ language support
- **Spell Checker** - Real-time spelling verification

#### Extension Management
- Easy install/uninstall
- Permission-based access control
- Extension data cleanup
- Installed badge display
- Clear descriptions and features

### 🌙 Dark Mode

#### Full Implementation
- System preference detection
- Manual theme selection
- Auto theme switching
- Consistent styling across all components
- OLED-optimized dark colors
- Custom scrollbar colors
- Proper contrast ratios

### 🖨️ Print Dialog

#### Features
- Print preview with live rendering
- Custom margin control
- Page size selection
- Orientation (Portrait/Landscape)
- Header/footer management
- Font size adjustment
- Paper preview

### 📦 Context Menu

#### Editor Context Menu
- Cut, Copy, Paste
- Select All
- Undo/Redo
- Find/Replace
- Bold, Italic, Highlight, Code formatting
- Link and image insertion
- Browser navigation (Back, Forward, Reload)
- Save As and Print
- View source code

#### Table Operations (in Preview)
- Add/remove cells, rows, columns
- Toggle header rows
- Table alignment and formatting

### 🎨 Visual Enhancements

#### UI Components
- Modern toolbar with grouping
- Icon-based buttons with Material Symbols
- Consistent spacing and alignment
- Smooth transitions and animations
- Hover effects and active states
- Status bar with real-time information

#### Styling
- Professional color palette
- Consistent border radius (8-16px)
- Proper box shadows
- Backdrop filters for modals
- Smooth color transitions in dark mode

### 🔍 Search & Replace

#### Features
- Live search highlighting
- Replace functionality
- Case sensitivity toggle
- Whole word matching
- Regex support with validation
- Search history with dropdown
- Status display (matches found)
- Keyboard navigation (Enter/Shift+Enter)

### 📊 Status Bar

#### Information Display
- Current file name
- Cursor position (Line, Column)
- Selection statistics
- Document statistics
- Real-time update on editor changes
- Mode indicators

### ⌨️ Keyboard Shortcuts

#### Key Mappings
- **Ctrl+Z** - Undo
- **Ctrl+Y** / **Ctrl+Shift+Z** - Redo
- **Ctrl+H** - Toggle Find/Replace
- **Ctrl+1** - Split view
- **Ctrl+2** - Editor only
- **Ctrl+3** - Preview only
- **Ctrl+B** - Bold
- **Ctrl+I** - Italic
- **Ctrl+Shift+X** - Strikethrough
- **Ctrl+Shift+H** - Highlight
- **Ctrl+M** - Toggle compact mode
- **F12** - Toggle developer tools

### 🚀 Performance

#### Optimizations
- Efficient DOM updates
- Debounced preview rendering
- Event listener cleanup
- Lazy loading of extensions
- Optimized CSS selectors
- Smooth animations with GPU acceleration

### 🐛 Bug Fixes

#### Fixed Issues
- Theme dialog responsive layout
- Syntax highlighting language detection
- Settings persistence reliability
- Copy button functionality
- Dark mode color consistency
- Scrollbar positioning in code blocks
- Modal centering and sizing

### 🎁 Quality of Life

#### User Experience
- Auto-save notification
- Status messages for actions
- Visual feedback on interactions
- Helpful tooltips on buttons
- Error messages with context
- Success confirmations

---

## Previous Versions

### Version 2.2.1*
- Initial settings framework
- Theme system implementation
- Basic syntax highlighting
- Extension management

### Version 2.2.0*
- Core markdown editor
- Split-view mode
- Basic formatting toolbar
- File operations

### Version 2.1.0
- Markdown parsing
- Preview rendering
- Basic styling

---

## Known Limitations & Future Improvements

### Current Limitations
- Maximum file size recommended: 10MB (depends on browser memory)
- Some advanced regex patterns may have edge cases
- Print preview rendering may differ slightly from actual print

### Planned for Future Versions
- Collaborative editing support
- Cloud sync and backup
- Advanced plugin system
- Custom themes marketplace
- Markdown linting
- Advanced table editor UI
- Code block line numbers
- Minimap for large documents
- Multiple document tabs

---

## Installation & Requirements

### Browser Requirements
- Modern browser with ES6+ support
- LocalStorage enabled
- JavaScript enabled
- 50MB+ free disk space (for temporary files)

### Recommended Browsers
- Chrome/Edge 88+
- Firefox 87+
- Safari 15+
- Opera 74+

### System Requirements
- 512MB RAM minimum
- Stable internet connection (for Google Fonts API)
- Display resolution: 1024x768 minimum

---

## Support & Documentation

### Getting Help
- Check the Help menu (?) in the application
- Review the Changelog for recent changes
- Enable Developer Mode for debugging

### Keyboard Shortcuts
Access from the Help menu or use Ctrl+? for quick reference

### Extension Documentation
Each extension includes detailed description and feature list in the Extensions dialog

---

## Acknowledgments

### Technologies Used
- Prism.js for syntax highlighting
- Material Symbols for icons
- Bootstrap Icons as backup
- Google Fonts API for custom fonts
- Modern Web APIs (File System Access, Clipboard, etc.)

### Contributors
Lancer Notes Development Team

---

## Legal

### License
MIT License - See LICENSE file for details

### Privacy Policy
Your files are stored locally in your browser. No data is sent to external servers except for Google Fonts API requests.

### Terms of Use
By using Lancer Notes, you agree to create, edit, and share markdown documents responsibly.

---

## Contact & Feedback

### Report Issues
Please report bugs and feature requests through the application's feedback system.

### Feature Requests
Submit suggestions via the Help menu or contact the development team.

### Stay Updated
Check the About section regularly for version updates and changelog news.

---

**Last Updated:** November 25, 2025  
**Current Version:** 2.2.2  
**Build:** Production Release
