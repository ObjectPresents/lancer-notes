# Changelog

## v1.3.2 (2025-10-26)

### Major Improvements
- Replaced regex-based parser with markdown-it for better CommonMark support
- Added syntax highlighting for code blocks using highlight.js integration
- Added support for local library vendoring (vendor-libs.ps1)
- Added proper support for backslash-escaped markdown characters
- Removed warning banner
- Added in-browser Tests button for smoke testing

### Technical Changes
- Added vendor-libs.ps1 PowerShell script to download vendor files
- Added DOMPurify integration for secure HTML sanitization
- Added highlight.js integration with markdown-it for code highlighting
- Preserved fallback parser for offline/no-CDN scenarios

## v1.3.1 (2025-10-25)
- Security update: Fixed Cross-Site Scripting (XSS) vulnerabilities

## v1.3 (2025-10-25)
- Final maintenance release
- Added Find and Replace functionality

## v1.2 (2025-09-17)
- Fix table format not working

## v1.1 (2025-09-16)
- Changed to new icons