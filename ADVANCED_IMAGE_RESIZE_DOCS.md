# Advanced Image Resize Feature - Complete Documentation

## Overview

The **Advanced Image Resize** system is a lightweight ML-based image classification engine integrated into Lancer Notes that automatically detects image types and applies intelligent sizing and theme-aware formatting.

**Release:** Lancer Notes v2.2.4  
**File:** `advanced-image-resize.js` (~8KB)  
**Dependencies:** None (built-in canvas API only)

---

## Features

### 1. 🤖 Automatic Image Classification

The system uses canvas-based pixel analysis to classify images into two categories:

#### **Normal Photo**
- Characteristics: High color variance, complex patterns, natural imagery
- Applied sizing: `max-width: 800px; height: auto;`
- Display: Block-level, takes full width up to 800px
- Use case: Photographs, screenshots, artwork

#### **Symbol/Icon**
- Characteristics: Low color variance, high edge density, simple geometric shapes
- Applied sizing: `max-width: 48px; height: auto; display: inline-block;`
- Display: Inline with vertical alignment, 2px margins
- Use case: Emojis, icons, small illustrations, badges

**Detection Algorithm:**
```
1. Load image → Canvas (64x64 sample)
2. Analyze pixel data:
   - Edge detection (neighboring pixel differences)
   - Color variance (RGB deviation from gray)
   - Brightness (luminance calculation)
3. Calculate complexity: edge_count / pixel_count
4. Classify:
   - If 0.15 < complexity < 0.65 AND colorVariance < 0.4 → Symbol
   - Otherwise → Normal Photo
```

**Confidence Scoring:**
- Returns 0.0-1.0 confidence based on how well image matches classification
- Used for debugging and future ML improvements

---

### 2. 🌓 Theme-Aware Color Inversion

Automatically detects dark/light images and inverts them when necessary for readability:

#### **Light Theme + Dark Image**
```
Detects: brightness < 128
Action: Apply CSS filter: invert(1)
Result: Dark elements become light
```

#### **Dark Theme + Light Image**
```
Detects: brightness > 128
Action: Apply CSS filter: invert(1)
Result: Light elements become dark
```

#### **Brightness Calculation:**
```javascript
luminance = 0.299 * R + 0.587 * G + 0.114 * B  // Standard ITU-R formula
```

**Benefits:**
- Prevent dark logos from disappearing on dark theme
- Prevent light backgrounds from blinding on light theme
- Automatic, no manual adjustment needed
- Respects user's theme preference

---

### 3. 💧 Transparency Support

All images get automatic transparency handling:

```css
background: transparent;  /* Remove backgrounds */
```

This ensures:
- Inverted images blend properly with theme colors
- Symbol backgrounds don't interfere with text
- Consistent appearance across themes

---

### 4. ⚡ Performance Optimization

**Lightweight Design:**
- No external ML/AI libraries
- Uses native Canvas API
- 64x64 pixel analysis (downsampling for speed)
- Single-pass edge detection
- Asynchronous processing (doesn't block editor)

**Memory Footprint:**
- ~8KB JavaScript file
- Minimal DOM overhead
- Canvas garbage collected after analysis

---

## Usage

### Automatic Integration

The system automatically integrates with the image insertion workflow:

#### **Method 1: Insert Image Button**
1. Click **Image** button in toolbar
2. Enter image URL
3. Check "Auto-resize this image" ✓
4. Click OK
5. System analyzes and inserts with optimal sizing

#### **Method 2: Programmatic Usage**

```javascript
// Analyze single image
const classification = await AdvancedImageResize.classifyImage(imgElement);
console.log(classification);
// Output: { type: 'symbol', confidence: 0.85, brightness: 64, ... }

// Apply smart resize to URL
const styledHtml = await AdvancedImageResize.applySmartResize(
  'https://example.com/icon.png',
  'My Icon'
);
// Output: <img src="..." style="max-width: 48px; filter: invert(1); ..." />

// Enhance existing images in preview
AdvancedImageResize.enhanceExistingImages(document.getElementById('preview'));
```

#### **Method 3: Create Styled Element**

```javascript
const img = await AdvancedImageResize.createStyledImageElement(
  'https://example.com/photo.jpg',
  'Alt text'
);
document.getElementById('preview').appendChild(img);
```

---

## Configuration

Edit `CONFIG` object in `advanced-image-resize.js`:

```javascript
const CONFIG = {
  NORMAL_IMAGE_MAX_WIDTH: 800,           // Pixels
  SYMBOL_MAX_WIDTH: 48,                  // Pixels
  SYMBOL_MIN_COMPLEXITY: 0.15,          // 0.0-1.0
  SYMBOL_MAX_COMPLEXITY: 0.65,          // 0.0-1.0
  EDGE_DETECTION_THRESHOLD: 0.3,        // 0.0-1.0
  SAMPLE_SIZE: 64,                       // Pixels (downsampling)
  INVERSION_BRIGHTNESS_THRESHOLD: 128   // 0-255 (grayscale)
};
```

**Tuning Tips:**
- ↓ `SYMBOL_MAX_COMPLEXITY` = More icons classified as symbols
- ↑ `SYMBOL_MIN_COMPLEXITY` = Fewer false positives
- ↓ `INVERSION_BRIGHTNESS_THRESHOLD` = More inversion on dark theme
- ↑ `INVERSION_BRIGHTNESS_THRESHOLD` = More inversion on light theme

---

## API Reference

### `classifyImage(imgElement)`

Analyzes loaded image element and returns classification.

**Parameters:**
- `imgElement` (HTMLImageElement) - Must be loaded (`naturalWidth > 0`)

**Returns:** Promise<Classification>
```javascript
{
  type: 'symbol' | 'normal',        // Classification
  confidence: number,                 // 0.0-1.0
  brightness: number,                 // 0-255
  hasTransparency: boolean,           // Alpha < 250
  complexity: number,                 // 0.0-1.0
  colorVariance: number               // 0.0-1.0
}
```

**Example:**
```javascript
const img = document.querySelector('img');
const result = await AdvancedImageResize.classifyImage(img);
if (result.type === 'symbol') {
  console.log('This is a small icon');
}
```

---

### `applySmartResize(src, altText)`

Loads image from URL and returns styled HTML with applied CSS.

**Parameters:**
- `src` (string) - Image URL
- `altText` (string, optional) - Alt text for accessibility

**Returns:** Promise<string> - HTML string with inline styles

**Example:**
```javascript
const html = await AdvancedImageResize.applySmartResize(
  'https://example.com/image.png',
  'Description'
);
// Returns: '<img src="..." style="max-width: 48px; ..." />'
editor.value += '\n' + html + '\n';
```

---

### `createStyledImageElement(src, alt)`

Creates DOM element instead of HTML string.

**Parameters:**
- `src` (string) - Image URL
- `alt` (string, optional) - Alt text

**Returns:** Promise<HTMLImageElement> - Styled image element

**Data Attributes Added:**
- `data-classification` - 'symbol' or 'normal'
- `data-complexity` - Complexity score (0.00-1.00)
- `data-brightness` - Brightness (0-255)

**Example:**
```javascript
const img = await AdvancedImageResize.createStyledImageElement(
  'https://example.com/image.png'
);
img.dataset.classification; // Access classification later
```

---

### `enhanceExistingImages(container)`

Scans container for images and applies smart resize to already-loaded images.

**Parameters:**
- `container` (Element, optional) - Default: `document`

**Returns:** Promise (resolved when all images processed)

**Example:**
```javascript
// Apply to preview pane
await AdvancedImageResize.enhanceExistingImages(
  document.getElementById('preview')
);
```

---

### `shouldInvertImage(brightness)`

Checks if image needs inversion based on theme and brightness.

**Parameters:**
- `brightness` (number) - 0-255 (from classification)

**Returns:** boolean

**Example:**
```javascript
if (AdvancedImageResize.shouldInvertImage(64)) {
  // This dark image needs inversion for current theme
  applyInversionFilter(img);
}
```

---

### `getClassificationInfo(classification)`

Returns human-readable classification details (for debugging).

**Parameters:**
- `classification` (Classification object)

**Returns:** Object with formatted percentages and info

**Example:**
```javascript
const info = AdvancedImageResize.getClassificationInfo(result);
console.log(info);
// Output:
// {
//   type: 'symbol',
//   confidence: '85.2%',
//   brightness: 64,
//   complexity: '42.3%',
//   colorVariance: '15.8%',
//   hasTransparency: true,
//   willInvert: true,
//   currentTheme: 'dark'
// }
```

---

## Implementation Details

### Pixel Analysis Algorithm

1. **Sample Image:** Downscale to 64x64 to reduce processing
2. **Extract Channels:** Split RGBA from ImageData
3. **Calculate Brightness:** ITU-R luminance formula for each pixel
4. **Edge Detection:** Compare adjacent pixels, count significant differences
5. **Complexity Score:** `edge_count / total_pixels`
6. **Color Variance:** Average RGB deviation from neutral gray

### Classification Decision Tree

```
        Image Loaded?
        ↓ Yes / No → Default (normal)
    
    Calculate Complexity
        ↓
    Is 0.15 < C < 0.65?
        ↓
        Yes → Check Color Variance
        ↓
        Is CV < 0.4?
            ↓
            Yes → SYMBOL ✓
            No → NORMAL
        ↓
        No → NORMAL
```

### CSS Generation

For **Symbol** classification:
```css
max-width: 48px;
height: auto;
display: inline-block;
background: transparent;
vertical-align: middle;
margin: 0 2px;
[+ inversion if needed]
```

For **Normal** classification:
```css
max-width: 800px;
height: auto;
display: inline-block;
background: transparent;
[+ inversion if needed]
```

---

## Examples

### Example 1: Simple Icon

**Input:** `https://example.com/star.svg` (24x24px, monochrome)

**Analysis:**
```javascript
{
  type: 'symbol',
  confidence: 0.92,
  brightness: 240,  // Light icon
  complexity: 0.38,
  colorVariance: 0.05
}
```

**Decision:**
- Light theme → No inversion (brightness > 128)
- Classification → Symbol
- Applied CSS: `max-width: 48px; display: inline-block;`

**Output:** `<img src="..." style="max-width: 48px; display: inline-block; ..." />`

---

### Example 2: Dark Photo

**Input:** `https://example.com/sunset.jpg` (4000x3000px, complex)

**Analysis:**
```javascript
{
  type: 'normal',
  confidence: 0.15,
  brightness: 60,   // Dark image
  complexity: 0.72,
  colorVariance: 0.85
}
```

**Decision:**
- Light theme + dark image (brightness < 128) → **Invert**
- Classification → Normal
- Applied CSS: `max-width: 800px; filter: invert(1);`

**Output:** `<img src="..." style="max-width: 800px; filter: invert(1); ..." />`

---

### Example 3: Complex Icon (False Positive Prevention)

**Input:** Intricate badge PNG (200x200px, complex but monochrome)

**Analysis:**
```javascript
{
  type: 'normal',  // Complexity 0.72 > 0.65
  confidence: 0.28,
  brightness: 128,
  complexity: 0.72,
  colorVariance: 0.08  // Still low variance
}
```

**Decision:**
- Complexity exceeded upper bound (0.72 > 0.65)
- Classified as normal (shows safe fallback)
- Applied CSS: `max-width: 800px;`

**Note:** User can manually resize if needed

---

## Troubleshooting

### Image Not Resizing?

1. **Check if image is hosted:** CORS-safe URLs required
2. **Verify "Auto-resize" checkbox:** Must be checked in dialog
3. **Check browser console:** Look for errors in DevTools
4. **Try manual sizing:** Insert normally and add `{width=48}` syntax

### Image Looks Wrong After Inversion?

1. **Check current theme:** Light mode inverts dark images
2. **Disable inversion manually:** Edit CSS, remove `filter: invert(1);`
3. **Report classification:** Use `AdvancedImageResize.getClassificationInfo()`

### Symbols Aren't Stacking?

1. **Check display property:** Must be `display: inline-block;`
2. **Check margins:** Should have `margin: 0 2px;`
3. **Verify vertical-align:** Should be `vertical-align: middle;`

---

## Browser Support

- ✅ Chrome/Brave 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 - Not supported (Canvas ImageData required)

**Features Used:**
- Canvas API
- ImageData API
- CSS Filters
- CSS `display: inline-block`
- Promise/async-await

---

## Future Enhancements

Potential improvements for v2.3+:

1. **Smarter Symbol Detection**
   - Detect aspect ratio (square = likely symbol)
   - Check for common icon sizes (16x16, 24x24, 32x32, 48x48)
   - Recognize SVG characteristics

2. **Text Extraction**
   - Detect if image contains text (OCR-like)
   - Prevent resizing text-heavy images too small

3. **Color Palette Analysis**
   - Extract dominant color
   - Suggest better inversion threshold
   - Generate theme-specific variants

4. **User Preferences**
   - Allow manual classification overrides
   - Remember user choices for similar images
   - Settings panel for tuning

5. **Performance Monitoring**
   - Track classification accuracy
   - Measure processing time
   - Report statistics

---

## License & Attribution

**Advanced Image Resize Module**
- Part of Lancer Notes v2.2.4+
- Created: November 28, 2025
- Built with: Canvas API, vanilla JavaScript
- No external dependencies

---

## Support

For issues or feature requests:
- **Discord:** @objectpresents
- **Bluesky:** objectpresents.bsky.social
- **Email:** lightingperson_2763@outlook.com.vn

---

*Last Updated: November 28, 2025*
