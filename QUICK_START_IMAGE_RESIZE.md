# Advanced Image Resize - Quick Start Guide

## 🚀 Getting Started in 30 Seconds

### For Users

1. **Open Lancer Notes**
2. **Click Image button** in toolbar (or Insert Menu → Image)
3. **Paste image URL**
4. **✓ Check "Auto-resize this image"** (NEW!)
5. **Click OK**

Done! The image will be:
- ✅ Automatically classified (icon vs photo)
- ✅ Sized perfectly (48px for symbols, 800px for photos)
- ✅ Inverted if needed for your theme
- ✅ Made transparent-compatible

---

## 📚 Usage Examples

### Example 1: Insert GitHub Logo (Symbol)

```
URL: https://github.githubassets.com/assets/GitHub-Mark-1.png
Auto-resize: ✓
```

**Result:**
- Detected as: **Symbol** (high edges, low color variance)
- Sized to: 48px
- On Dark Theme: Filter applied automatically
- Displays inline with text ✓

---

### Example 2: Insert Beach Photo (Normal)

```
URL: https://example.com/beach-sunset.jpg
Auto-resize: ✓
```

**Result:**
- Detected as: **Normal Photo** (complex, colorful)
- Sized to: 800px (fills readable width)
- On Light Theme: No inversion needed
- Displays as block image ✓

---

### Example 3: Insert Dark Logo (Theme-Aware)

```
URL: https://example.com/dark-logo.svg
Auto-resize: ✓
Current Theme: Light Mode
```

**Result:**
- Detected as: **Symbol** (monochrome)
- Brightness detected: ~50 (dark)
- Theme check: Light theme + Dark image = INVERT
- Filter applied: `invert(1)` → Now visible! ✓

---

## 🎯 What Gets Automatically Detected

### ✅ Symbols (48px sizing)
- Emojis & Unicode graphics
- App icons
- Badges & badges
- Monochrome logos
- Small illustrations
- Decorative elements

### ✅ Normal Photos (800px sizing)
- Landscape photographs
- Screenshot images
- Complex artwork
- High color variation
- Multi-subject images

---

## 🔧 For Developers

### Access Classification Data

```javascript
// After image insertion, check classification:
const classifiedImages = document.querySelectorAll('[data-classification]');

classifiedImages.forEach(img => {
  console.log({
    src: img.src,
    type: img.dataset.classification,      // 'symbol' or 'normal'
    complexity: img.dataset.complexity,    // 0.00 - 1.00
    brightness: img.dataset.brightness     // 0 - 255
  });
});
```

### Manually Analyze Image

```javascript
// Get classification object
const result = await AdvancedImageResize.classifyImage(imageElement);

console.log(result);
// {
//   type: 'symbol',
//   confidence: 0.87,
//   brightness: 45,
//   complexity: 0.38,
//   colorVariance: 0.12,
//   hasTransparency: true
// }
```

### Tune Detection Sensitivity

Edit in `advanced-image-resize.js`:

```javascript
// Make icons more aggressive (lower bounds)
CONFIG.SYMBOL_MIN_COMPLEXITY = 0.1;    // Was 0.15
CONFIG.SYMBOL_MAX_COMPLEXITY = 0.7;    // Was 0.65

// Then reload page - all new images use new settings
```

---

## 💡 Pro Tips

### Tip 1: Manual Override
If auto-detection gets it wrong:
1. Insert normally (uncheck auto-resize)
2. Right-click image → Inspect
3. Edit `style` attribute directly
4. Change `max-width` to desired value

### Tip 2: Check Detection
Inspect element to see applied styles:
```html
<img src="icon.svg" style="max-width: 48px; display: inline-block; filter: invert(1);" />
```

### Tip 3: Debug Classification
In browser console:
```javascript
const info = AdvancedImageResize.getClassificationInfo(classification);
console.table(info);
// Outputs formatted table with all metrics
```

### Tip 4: Batch Process Existing Images
```javascript
// Apply to all images in preview
AdvancedImageResize.enhanceExistingImages(
  document.getElementById('preview')
);
```

---

## ⚙️ Configuration Reference

In `advanced-image-resize.js`, find `CONFIG` object:

```javascript
const CONFIG = {
  // What size should normal images be?
  NORMAL_IMAGE_MAX_WIDTH: 800,

  // What size should symbols be?
  SYMBOL_MAX_WIDTH: 48,

  // How "complex" must an image be to be a symbol?
  SYMBOL_MIN_COMPLEXITY: 0.15,        // Increase = fewer symbols detected
  SYMBOL_MAX_COMPLEXITY: 0.65,        // Decrease = more symbols detected

  // Sample size for analysis (smaller = faster, less accurate)
  SAMPLE_SIZE: 64,

  // At what brightness should we invert?
  INVERSION_BRIGHTNESS_THRESHOLD: 128 // 128 = exact middle (0=black, 255=white)
};
```

---

## 🐛 Troubleshooting

### "Image isn't resizing"
1. Is "Auto-resize this image" ✓ checked? **Yes** → Continue
2. Is the URL accessible? Test in browser directly
3. Check browser console (F12) for CORS errors
4. Try different image URL

### "Image looks inverted incorrectly"
1. What theme are you using? (Check Theme button)
2. Expected: Dark images light up on dark themes
3. If not: Check brightness detection via console

### "Symbol is too big/small"
1. Change `SYMBOL_MAX_WIDTH: 48` to preferred size
2. Or manually edit: `style="max-width: 64px;"`
3. Reload to apply to new images

### "Emoji detected as normal photo"
1. Emoji complexity might be high
2. Lower `SYMBOL_MAX_COMPLEXITY` from 0.65 to 0.60
3. Reload page

---

## 📊 How Classification Works (In Plain English)

The system asks three questions:

**Question 1:** "Does this image have lots of edges?" (Sharp, crisp details)
- High edges = Likely a symbol
- Low edges = Likely a smooth photo

**Question 2:** "How many different colors?" (Color variety)
- Few colors = Likely a symbol (black & white icon)
- Many colors = Likely a complex photo

**Question 3:** "Is it an intermediate complexity?" (Sweet spot)
- Too simple (< 0.15) = Not classified as symbol
- Too complex (> 0.65) = Probably real photo
- In between (0.15-0.65) = Is symbol

**Result:**
- All three say YES → **Symbol** (48px)
- Otherwise → **Photo** (800px)

---

## 🌙 Theme Inversion Explained

### How it decides to invert:

```
1. Calculate image brightness (0-255)
   0 = Pure black, 255 = Pure white

2. Check user's theme
   Light theme? Compare to threshold (128)
   Dark theme? Compare to threshold (128)

3. Invert if:
   - Light theme AND image darker than 128 → Invert
   - Dark theme AND image lighter than 128 → Invert
   - Otherwise → Don't invert
```

### Why invert?

Imagine dark blue logo on dark theme:
```
Without inversion:
🌙 Dark theme + 🔵 Dark blue logo = Can't see logo ❌

With inversion:
🌙 Dark theme + 🔵 Dark blue inverted to light = Can see logo ✓
```

---

## 📈 Performance

- **File size:** ~8KB (unminified)
- **Load time:** < 1ms (async)
- **Analysis time:** 2-10ms per image
- **DOM overhead:** Minimal (data attributes only)
- **Memory:** Cleared after analysis (garbage collected)

---

## 🎓 Learning More

### Read Full Documentation
Open `ADVANCED_IMAGE_RESIZE_DOCS.md` for:
- Complete API reference
- Algorithm details
- Implementation specifics
- Advanced usage patterns

### Check Changelog
Open `CHANGELOG.md` → Version 2.2.4 for:
- What's new
- Breaking changes
- Configuration details

### Explore Code
`advanced-image-resize.js`:
- ~350 lines (well-commented)
- Clear function names
- Algorithm documentation
- Configuration section at top

---

## 🤝 Feedback & Support

Found a bug? Have a suggestion?

- 💬 **Discord:** @objectpresents
- 🦋 **Bluesky:** objectpresents.bsky.social  
- 📧 **Email:** lightingperson_2763@outlook.com.vn

---

**Happy image inserting!** 🎨

*Version 2.2.4 - Advanced Image Resize*
