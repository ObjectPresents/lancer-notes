# Testing New Features

## Word Wrap with Scrollable Code Blocks

This is a test of word wrap functionality. When you enable word wrap using the toolbar button, long lines of text will wrap automatically to prevent horizontal scrolling.

### Code blocks remain scrollable:

```javascript
function exampleWithVeryLongFunctionNameThatWouldNormallyRequireHorizontalScrolling() {
    const longVariableName = "This is a very long string that would typically cause horizontal scrolling in code blocks";
    console.log("Code blocks maintain horizontal scroll even when word wrap is enabled for better code readability");
    return longVariableName.split('').map(char => char.charCodeAt(0)).join('-');
}
```

## Image Positioning Examples

> **⚠️ IMPORTANT COMPATIBILITY NOTICE:**  
> The image positioning syntax `{left}`, `{right}`, `{center}` is a **CUSTOM EXTENSION** for Lancer Notes.  
> This is **NOT standard Markdown** and **NOT GitHub Flavored Markdown**.  
> This feature was specifically designed to make document layout easier for students and educational use.  
> If you use these markdown files in other editors (VS Code, Typora, GitHub, etc.), the positioning tags will appear as plain text and won't work.  
> For maximum compatibility, avoid using this syntax if you plan to share your files with other platforms.

### Left-Aligned Image (Text Wraps Around)
![Sample Image](https://via.placeholder.com/300x200){left}

This text will wrap around the left-aligned image. The image floats to the left and text flows around it. This is useful for creating magazine-style layouts where images are integrated with text content. You can continue writing and the text will naturally flow around the positioned image.

---clear---

### Right-Aligned Image (Text Wraps Around)
![Sample Image](https://via.placeholder.com/300x200){right}

This text will wrap around the right-aligned image. The image floats to the right and text flows to its left. This creates a professional document layout where images complement the text without interrupting the reading flow.

---clear---

### Center-Aligned Image (Standalone)
![Sample Image](https://via.placeholder.com/400x300){center}

Centered images are displayed as standalone elements without text wrapping. They're perfect for showcasing important visuals that deserve full attention.

## Regular Image (No Positioning)
![Sample Image](https://via.placeholder.com/500x300)

Images without positioning syntax display normally as block elements at full width (or capped width if auto-resize is enabled).

## Combining Features

You can combine word wrap with image positioning to create rich, flowing documents:

![Example](https://via.placeholder.com/250x150){left}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. When word wrap is enabled, this text will wrap nicely around the image without any horizontal scrolling. The combination of these features allows you to create professional-looking documents with integrated images and flowing text.

---clear---

## Tips

- Use `{left}` or `{right}` for images you want text to wrap around
- Use `{center}` for standalone feature images
- Use `---clear---` or `+++clear+++` to force content below floated images
- Code blocks always remain horizontally scrollable for code readability
- Toggle word wrap using the toolbar button or keyboard shortcut
