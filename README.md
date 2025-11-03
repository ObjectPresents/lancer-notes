# lancer-notes
A Markdown notes app that's heavily forked from orginial Lancer Fan Club fourms website.

Project completed by 100% solo with moderate use of AI, templates and inspriations: Taylor Hakes, Gregor Santner and ObjectPresents.

Any feedbacks can go to: @objectpresents (Discord), objectpresents.bsky.social (Bluesky) or lightingperson_2763@outlook.com.vn

## Changelogs:
#### v2.1.4 (03.11.2025)
- UI consistency improvements across the app:
  - Standardized toolbar buttons to a consistent icon + text pattern.
  - Unified popup title bars with blue headers, close buttons, rounded corners, and consistent shadows.
- Redesigned Find/Replace as a centered dialog with header, improved spacing, and dark-mode support.
- Replaced image cap prompt with a proper Image Cap dialog (validation, persistence, Enter-to-confirm).
- Dark-mode scrollbars across browsers (added color-scheme hints and custom scrollbar styling).
- Bumped application version to v2.1.4.
#### v2.1.3 (29/10/2025)
Features and improvements in v2.1.3:

- Implemented heading rendering inside blockquotes so Markdown headings within ">" blocks render as proper HTML headings.
- Added "image from link" auto-resize option (dialog checkbox). When enabled, the editor measures the linked image client-side and inserts responsive <img> markup with a configurable maximum width (default: 800px). Runtime cap can be adjusted via the toolbar control; preferences are persisted to localStorage (keys: md-auto-resize-images, md-auto-resize-max). Toolbar control id: #btn-image-cap.
- Word wrap (beta) improvements and details:
  - Works in both the editor and the preview. Long words and URLs wrap at safe boundaries to avoid horizontal scrolling.
  - Code blocks use white-space: pre-wrap while preserving indentation; inline code wraps without breaking layout.
  - Blockquotes, lists, and table cells are hardened to wrap content cleanly without overflow.
  - Toggle via toolbar button (#btn-wordwrap) or keyboard shortcut (Ctrl+Alt+W / Ctrl+Shift+W).
  - Preference persists in localStorage under md-word-wrap.
  - Credits: feature made by LoserFan2020 with contributions from Phuc and Hung.
- Misc: reordered blockquote/header parsing so headings inside blockquotes render correctly, fixed related JavaScript and CSS syntax issues encountered during development, and applied small UX polish to dialogs and controls.
#### v2.2.0-beta-1 (28/10/2025)

- Added support for editing directly in preview pane
- Implemented real-time synchronization between editor and preview
- Enhanced markdown-to-HTML conversion for better editing experience
- Improved bidirectional editing capabilities
- Added more basic table functionality
- Implemented automatic update checking system
- All features from v2.1.4, v2.1.3, v2.1.2 ported to v2.2:
  - Word wrap (beta) with toolbar button and keyboard shortcut
  - Image auto-resize feature with configurable maximum width
  - Heading rendering inside blockquotes
  - Unified popup styling with blue headers
  - Dark-mode scrollbars with color-scheme support
  - Centered Find/Replace dialog
  - Undo/Redo history dropdown on hover
  - Improved undo/redo system with 250ms throttle for reduced lag
  - Dark-mode styling for history dropdown
#### v1.3.2 (27/10/2025):
- Major Improvements for v1.3.2:
  - Replaced regex-based parser with markdown-it for better CommonMark support
  - Added syntax highlighting for code blocks using highlight.js integration
  - Added support for local library vendoring (vendor-libs.ps1)
  - Added proper support for backslash-escaped markdown characters
  - Removed warning banner due to backlash
  - Added in-browser Tests button for smoke testing
#### v2.1.2 (26/10/2025):
- Small fixes and polish for v2.1.2:
  - Fix dark-mode styling for the undo/redo history dropdown
  - Keep history dropdown visible when hovering between the toolbar button and the menu
  - Move changelogs to a local view and ensure the popup respects dark mode
  - Improved undo/redo system with reduced lag (250ms throttle)
  - Fixed changelog formatting and removed duplicate entries
  - Renamed README.md to CHANGELOG.md for better organization
  - Bumped application version to v2.1.2

#### v1.3.1 and v2.1.1 (25/10/2025)
No major updates for v2.1.1, as we do it to update v1.3.\
New feature: Check for Updates (This was going to be included in v2.2, but because of v1.3 security patch, it have to be added)\
We patched the Cross-Site Scripting (XSS) security vulnerability as a result, and Security Mode turned ON by default.
#### v1.3 (25/10/2025)
We have updated those features for you and fixes bugs, for legacy apps.\
New feaures such as Find and Replace are added.\
We discovered a major security vulnerability involving Cross-Site Scripting (XSS), which could be exploited for malicious purposes.
#### v2.1 (23/10/2025)
We have updated those features for you and fixes bugs.\
New feaures such as HR, Task, Align Table, Subscript and Superscript, and many more features. More features coming soon.
#### v2.0.5 (1/10/2025)
Happy Halloween! We have updated those features for you and fixes bugs.\
New changelogs and help layout.\
Fixed broken dark mode (most of the time, it's still inconsistent)
#### v2.0.4 (25/9/2025)
Popup UI Changed to be modular and most of them are centered (not consistent yet, coming soon)\
Settings finally removed (as a bug)\
Support for Full Blockquote, Proper number list support, Espcaing characters
#### v2.0.3 (24/9/2025)
Added Regex search/replace mode (toggleable); Regex flags (m/s), search history dropdown, and match highlighting in preview.
#### v2.0.2 (21/9/2025)
Find and replace support
#### v2.0.1 (19/9/2025)
Added support for .txt\
Fixed editor UI bug where it breaks after resizing spilt mode
#### v2.0 (18/9/2025): 
Changed structure of the code - from then it's not the same and need to be downloaded manually.
#### v1.2 (17/9/2025):
Fixed issue where Table format didn't work outright.
#### v1.1 (16/9/2025):
New icon design\
Minor bug fixed
#### v1.0 (14/1/2024): 
Orginial Markdown Editior, forked from Lancer Fan Club Forums.\
Features Headings, Basic syntax, code support, Basic table support, and very simple UI.
