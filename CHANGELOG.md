## v2.1.5 (07/11/2025)
- Feature updates in v2.1.5:
  - Added a table alignment dropdown consolidating left/center/right controls.
  - Added a wrap-around option to Find/Replace navigation with status messaging.
  - Refined toolbar dropdown styling with matching dark-mode treatment.
- Fixes:
  - Improved dark-mode preview readability for text and highlighted matches.
- Maintenance:
  - Bumped application version to v2.1.5.

## v2.1.4 (03/11/2025)
- UI consistency improvements across the app:
  - Standardized toolbar buttons to a consistent icon + text pattern.
  - Unified popup title bars with blue headers, close buttons, rounded corners, and consistent shadows.
- Redesigned Find/Replace as a centered dialog with header, improved spacing, and dark-mode support.
- Replaced image cap prompt with a proper Image Cap dialog (validation, persistence, Enter-to-confirm).
- Dark-mode scrollbars across browsers (added color-scheme hints and custom scrollbar styling).
- Bumped application version to v2.1.4.

## v2.1.3 (29/10/2025)
- Implemented heading rendering inside blockquotes so Markdown headings within ">" blocks render as proper HTML headings.
- Added "image from link" auto-resize option (dialog checkbox). When enabled, the editor measures the linked image client-side and inserts responsive <img> markup with a configurable maximum width (default: 800px). Runtime cap can be adjusted via the toolbar control; preferences are persisted to localStorage (keys: `md-auto-resize-images`, `md-auto-resize-max`). Toolbar control id: `#btn-image-cap`.
- Added a word-wrap toggle for the editor textarea (marked "beta"). The feature defaults to OFF, can be toggled via the toolbar button (`#btn-wordwrap`) or keyboard shortcut (Ctrl+Alt+W / Ctrl+Shift+W), and the preference is persisted to localStorage under `md-word-wrap`.
- Misc: reordered blockquote/header parsing so headings inside blockquotes render correctly, fixed related JavaScript and CSS syntax issues encountered during development, and applied small UX polish to dialogs and controls.

Developer testing notes:
- Image auto-resize: open the Insert Image dialog, toggle "Auto-resize" on, paste a remote image URL and insert — the editor should insert responsive HTML <img> markup (with inline width/height and srcset when available); inspect preview to verify it respects the configured cap (default 800px).
- Word-wrap: toggle the Wrap toolbar button (shows a small "beta" badge) or press the shortcut (Ctrl+Alt+W / Ctrl+Shift+W) to enable/disable soft wrapping in the editor textarea; verify the `wrap` class is applied to the editor and the preference survives reload.
- If you need to reset these preferences, clear the corresponding localStorage keys (`md-auto-resize-images`, `md-auto-resize-max`, `md-word-wrap`).

## v2.1.2 (26/10/2025)
- Small fixes and polish for v2.1.2:
  - Fix dark-mode styling for the undo/redo history dropdown
  - Keep history dropdown visible when hovering between the toolbar button and the menu
  - Move changelogs to a local view and ensure the popup respects dark mode
  - Improved undo/redo system with reduced lag (250ms throttle)
  - Fixed changelog formatting and removed duplicate entries
  - Renamed README.md to CHANGELOG.md for better organization
  - Bumped application version to v2.1.2

## v2.1.1 (25/10/2025)
No major features; maintenance and polish:
- Added "Check for Updates" feature

## v1.3.1 (25/10/2025)
Security patch applied in v1.3.1 only:
- Patched a Cross-Site Scripting (XSS) vulnerability that affected older code paths
- Security Mode was enabled as part of the v1.3.1 patch to mitigate risk

## v1.3 (25/10/2025)
Improvements and bug fixes for legacy apps:
- Added Find and Replace

## v2.1 (23/10/2025)
Updated features and bug fixes:
- New features: HR, Task items, Table alignment, Subscript, Superscript, and more

## v2.0.5 (01/10/2025)
Happy Halloween! UI and layout updates:
- Help/changelog layouts improved
- Various dark-mode fixes

## v2.0.4 (25/09/2025)
- Popup UI changed to be more modular and centered
- Escaping and list fixes

## v2.0.3 (24/09/2025)
- Added regex search/replace with flags and preview highlighting

## v2.0.2 (21/09/2025)
- Find and replace support

## v2.0.1 (19/09/2025)
- Added support for .txt files
- Fixed split-mode resize bug

## v2.0 (18/09/2025)
- Major internal restructuring

## v1.2 (17/09/2025)
- Fixed table formatting issues

## v1.1 (16/09/2025)
- New icon design and minor bug fixes

## v1.0 (14/01/2024)
Original Markdown Editor, forked from Lancer Fan Club Forums:
- Features: headings, basic syntax, code support, table support, and a simple UI