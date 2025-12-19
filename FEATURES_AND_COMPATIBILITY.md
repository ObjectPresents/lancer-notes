# Lancer Notes - Features & Compatibility Guide

## 📋 Overview

Lancer Notes is a feature-rich Markdown editor designed primarily for **educational use** and **students**. While it supports standard Markdown syntax, it also includes custom extensions to make document creation and layout easier for learners.

## ✅ Standard Markdown Support

These features work in **all Markdown editors** and are fully compatible with **GitHub Flavored Markdown (GFM)**:

### Basic Syntax
- **Headings**: `# H1`, `## H2`, `### H3`, etc.
- **Bold**: `**bold**` or `__bold__`
- **Italic**: `*italic*` or `_italic_`
- **Strikethrough**: `~~strikethrough~~`
- **Code**: `` `inline code` ``
- **Code blocks**: ` ```language ... ``` `
- **Links**: `[text](url)`
- **Images**: `![alt text](url)`
- **Lists**: `- item` or `1. item`
- **Blockquotes**: `> quote`
- **Horizontal rules**: `---` or `***` or `___`
- **Tables**: Standard pipe-delimited tables

## ⚠️ Custom Extensions (Lancer Notes Only)

These features are **CUSTOM EXTENSIONS** and will **NOT WORK** in other Markdown editors:

### 1. Image Positioning ❌ NOT STANDARD MARKDOWN

**Syntax:**
```markdown
![Alt text](image.jpg){left}    # Float image left
![Alt text](image.jpg){right}   # Float image right
![Alt text](image.jpg){center}  # Center image
---clear---                      # Clear floats
```

**⚠️ Compatibility Warning:**
- ❌ **NOT** part of standard Markdown
- ❌ **NOT** part of GitHub Flavored Markdown  
- ❌ Will **NOT** render in VS Code, GitHub, Typora, etc.
- ✅ **ONLY** works in Lancer Notes
- 🎓 Designed for students to easily create magazine-style layouts

**What happens in other editors?**
- The `{left}`, `{right}`, `{center}` tags will appear as plain text
- The `---clear---` syntax will render as a horizontal rule
- Images will display normally without positioning

**Recommendation:**
- Use this feature **only** for documents that will stay in Lancer Notes
- Remove these tags before sharing `.md` files with others
- For maximum compatibility, use standard HTML instead:
  ```html
  <img src="image.jpg" align="left" width="300">
  ```

### 2. Extended Markdown Features (Optional)

Lancer Notes includes several **Extended Markdown** features that can be **disabled** in settings:

**Superscript & Subscript:**
```markdown
^superscript^   # NOT standard, but common in some editors
~subscript~     # NOT standard, but common in some editors
```

**Task Lists:**
```markdown
- [ ] Unchecked task
- [x] Checked task
```
✅ This IS part of GitHub Flavored Markdown and works widely

**Footnotes:**
```markdown
Text with footnote[^1]

[^1]: Footnote content
```
⚠️ Supported by some editors, but NOT standard Markdown

**Definition Lists:**
```markdown
Term
: Definition
```
⚠️ NOT standard Markdown

## 🔧 Features for Educational Use

### Why Custom Extensions?

Lancer Notes includes custom features specifically designed for students:

1. **Easier Layout Control**: Image positioning without HTML knowledge
2. **Visual Learning**: Students can create visually appealing documents
3. **Reduced Complexity**: Simpler syntax than HTML/CSS
4. **Instant Preview**: See changes immediately

### Best Practices for Students

**If your document stays in Lancer Notes:**
- ✅ Use all features freely
- ✅ Take advantage of image positioning
- ✅ Create rich, visually appealing notes

**If you need to share your document:**
- ⚠️ Remove custom syntax before exporting
- ⚠️ Test in target platform (GitHub, VS Code, etc.)
- ⚠️ Use standard Markdown only
- ⚠️ Consider exporting to PDF/HTML instead

**For collaboration:**
- 📝 Stick to standard Markdown syntax
- 📝 Avoid custom extensions
- 📝 Document any non-standard features used
- 📝 Provide both `.md` and exported formats

## 📊 Compatibility Matrix

| Feature | Lancer Notes | GitHub | VS Code | Typora | Standard MD |
|---------|-------------|--------|---------|--------|-------------|
| Basic Markdown | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tables | ✅ | ✅ | ✅ | ✅ | ✅ |
| Task Lists | ✅ | ✅ | ✅ | ✅ | ⚠️ GFM Only |
| Code Highlighting | ✅ | ✅ | ✅ | ✅ | ⚠️ Editor Dependent |
| **Image Positioning** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Float Clearing** | ✅ | ❌ | ❌ | ❌ | ❌ |
| Footnotes | ✅ | ⚠️ | ⚠️ | ✅ | ❌ |
| Superscript/Sub | ✅ | ⚠️ | ⚠️ | ✅ | ❌ |

## 💡 Tips for Maximum Compatibility

### For Academic Assignments
If you're submitting work to professors or platforms:
1. **Ask** what Markdown flavor is supported
2. **Test** your document in the target platform
3. **Remove** Lancer Notes-specific syntax
4. **Export** to PDF if rich formatting is needed

### For Personal Notes
If documents are for your own use:
- ✅ Use all Lancer Notes features freely
- ✅ Take advantage of custom extensions
- ✅ Focus on learning and productivity

### For GitHub/GitLab
If publishing to code repositories:
- ❌ Remove image positioning syntax
- ✅ Use standard GFM syntax only
- ✅ Test preview in GitHub before committing

### For Blog Platforms
If using for blog content:
- Check platform's Markdown support
- Use HTML for advanced layout
- Test thoroughly before publishing

## 🎯 Summary

**The Golden Rule:**
> Custom image positioning (`{left}`, `{right}`, `{center}`) is a Lancer Notes educational feature. 
> It's NOT standard Markdown and won't work elsewhere.

**When in doubt:**
- Stick to standard Markdown syntax
- Use the feature compatibility matrix above
- Test in your target platform
- Ask your instructor or platform documentation

## 📚 Resources

- [Standard Markdown Spec](https://daringfireball.net/projects/markdown/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [CommonMark](https://commonmark.org/)

---

**Lancer Notes** - Making Markdown easier for students! 🚀
