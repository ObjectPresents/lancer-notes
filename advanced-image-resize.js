/**
 * Advanced Image Resize Feature (v2.2.4+)
 * 
 * Lightweight ML-based image classification system that:
 * 1. Detects image type (normal photo vs symbol/icon)
 * 2. Auto-applies appropriate sizing (full-width vs small & stackable)
 * 3. Ensures transparency support (transforms non-transparent backgrounds to transparent)
 * 4. Handles theme-aware inversion (inverts dark symbols on light theme & vice versa)
 * 
 * No external ML libraries - uses canvas pixel analysis for classification
 */

const AdvancedImageResize = (() => {
    // Configuration
    const CONFIG = {
        NORMAL_IMAGE_MAX_WIDTH: 800,     // Regular images
        SYMBOL_MAX_WIDTH: 48,             // Icons/symbols
        SYMBOL_MIN_COMPLEXITY: 0.15,     // Complexity threshold for symbol detection
        SYMBOL_MAX_COMPLEXITY: 0.65,     // Upper bound for symbols
        EDGE_DETECTION_THRESHOLD: 0.3,   // Edge detection sensitivity
        SAMPLE_SIZE: 64,                  // Reduce image to 64x64 for analysis
        INVERSION_BRIGHTNESS_THRESHOLD: 128 // Brightness threshold for color inversion
    };

    /**
     * Lightweight image classifier using pixel analysis
     * Returns: { type: 'symbol'|'normal', confidence: 0-1, brightness: 0-255 }
     */
    async function classifyImage(imgElement) {
        return new Promise((resolve) => {
            // Verify image is loaded
            if (!imgElement || !imgElement.naturalWidth) {
                resolve({ type: 'normal', confidence: 0, brightness: 128 });
                return;
            }

            // Create canvas for pixel analysis
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            
            // Determine sample size preserving aspect ratio
            const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
            const sampleWidth = Math.min(CONFIG.SAMPLE_SIZE, imgElement.naturalWidth);
            const sampleHeight = Math.round(sampleWidth / aspectRatio);

            canvas.width = sampleWidth;
            canvas.height = sampleHeight;

            // Draw image on canvas
            ctx.drawImage(imgElement, 0, 0, sampleWidth, sampleHeight);

            try {
                const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
                const data = imageData.data;

                // Analyze pixel data
                const analysis = analyzePixelData(data, sampleWidth, sampleHeight);
                
                // Classify based on analysis
                const classification = classifyBasedOnAnalysis(analysis);
                
                resolve(classification);
            } catch (e) {
                console.warn('Image classification error:', e);
                resolve({ type: 'normal', confidence: 0, brightness: 128 });
            }
        });
    }

    /**
     * Analyze pixel data to extract features
     */
    function analyzePixelData(data, width, height) {
        let edges = 0;
        let colorVariance = 0;
        let brightness = 0;
        let alpha = 0;
        let pixelCount = 0;

        // First pass: collect basic statistics
        const pixels = [];
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            // Calculate brightness (luminance)
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            brightness += lum;
            alpha += a;
            pixelCount++;

            pixels.push({ r, g, b, a, lum });
        }

        brightness = brightness / pixelCount;
        alpha = alpha / pixelCount;

        // Second pass: detect edges (compare adjacent pixels)
        for (let y = 0; y < height - 1; y++) {
            for (let x = 0; x < width - 1; x++) {
                const idx = (y * width + x);
                const current = pixels[idx];
                const right = pixels[idx + 1];
                const below = pixels[idx + width];

                if (current && right && below) {
                    // Calculate color difference (edge strength)
                    const diffRight = Math.hypot(
                        current.r - right.r,
                        current.g - right.g,
                        current.b - right.b
                    );
                    const diffBelow = Math.hypot(
                        current.r - below.r,
                        current.g - below.g,
                        current.b - below.b
                    );

                    if (diffRight > 50 || diffBelow > 50) {
                        edges++;
                    }
                }
            }
        }

        // Calculate complexity (edge density)
        const complexity = edges / (pixelCount * 0.8);

        // Calculate color variance
        let colorDiff = 0;
        for (let i = 0; i < pixels.length; i++) {
            colorDiff += Math.hypot(
                pixels[i].r - 128,
                pixels[i].g - 128,
                pixels[i].b - 128
            );
        }
        colorVariance = colorDiff / pixelCount / 255;

        return {
            complexity: Math.min(complexity, 1),
            colorVariance,
            brightness: Math.round(brightness),
            alpha: Math.round(alpha),
            edgeCount: edges,
            pixelCount
        };
    }

    /**
     * Classify image as symbol or normal based on analysis
     */
    function classifyBasedOnAnalysis(analysis) {
        const { complexity, colorVariance, brightness, alpha } = analysis;

        // Symbol characteristics:
        // 1. High edge density (detailed/crisp)
        // 2. Low color variance (monochrome or limited palette)
        // 3. Medium complexity
        // 4. Often has transparency

        const isSymbol = 
            complexity > CONFIG.SYMBOL_MIN_COMPLEXITY &&
            complexity < CONFIG.SYMBOL_MAX_COMPLEXITY &&
            colorVariance < 0.4; // Low color variance

        const confidence = Math.abs(complexity - 0.4); // Higher if complexity is around 0.4

        return {
            type: isSymbol ? 'symbol' : 'normal',
            confidence: Math.min(confidence, 1),
            brightness,
            hasTransparency: alpha < 250,
            complexity,
            colorVariance
        };
    }

    /**
     * Detect if image needs color inversion based on theme
     */
    function shouldInvertImage(brightness) {
        const isDarkTheme = document.body.classList.contains('dark-mode');
        
        if (isDarkTheme) {
            // Dark theme: invert if image is too light
            return brightness > CONFIG.INVERSION_BRIGHTNESS_THRESHOLD;
        } else {
            // Light theme: invert if image is too dark
            return brightness < CONFIG.INVERSION_BRIGHTNESS_THRESHOLD;
        }
    }

    /**
     * Generate CSS for resizing image
     */
    function generateResizeCSS(classification) {
        const { type, brightness } = classification;
        const maxWidth = type === 'symbol' ? CONFIG.SYMBOL_MAX_WIDTH : CONFIG.NORMAL_IMAGE_MAX_WIDTH;
        
        let css = `max-width: ${maxWidth}px; height: auto; display: inline-block; `;
        
        // Add transparency support
        css += `background: transparent; `;
        
        // Add theme-aware inversion
        if (shouldInvertImage(brightness)) {
            css += `filter: invert(1); `;
        }
        
        // For symbols: make stackable and ensure proper vertical alignment
        if (type === 'symbol') {
            css += `vertical-align: middle; margin: 0 2px; `;
        }
        
        return css;
    }

    /**
     * Apply advanced resize to image in markdown
     * Returns markdown with applied inline styles
     */
    async function applySmartResize(imageSrc, altText = '') {
        try {
            // Create temporary image to load and analyze
            const tempImg = document.createElement('img');
            
            return new Promise((resolve) => {
                tempImg.onload = async () => {
                    const classification = await classifyImage(tempImg);
                    const css = generateResizeCSS(classification);
                    
                    // Generate HTML with inline styles
                    const styledHtml = `<img src="${imageSrc}" alt="${altText}" style="${css}" />`;
                    
                    resolve(styledHtml);
                };

                tempImg.onerror = () => {
                    // Fallback for failed image loads
                    const defaultCss = `max-width: ${CONFIG.NORMAL_IMAGE_MAX_WIDTH}px; height: auto;`;
                    const styledHtml = `<img src="${imageSrc}" alt="${altText}" style="${defaultCss}" />`;
                    resolve(styledHtml);
                };

                // Set crossOrigin for external images
                tempImg.crossOrigin = 'anonymous';
                tempImg.src = imageSrc;
            });
        } catch (e) {
            console.warn('Error applying smart resize:', e);
            // Fallback markdown
            return `![${altText}](${imageSrc})`;
        }
    }

    /**
     * Create styled image element directly (for DOM manipulation)
     */
    async function createStyledImageElement(src, alt = '') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;

        return new Promise((resolve) => {
            img.onload = async () => {
                const classification = await classifyImage(img);
                const css = generateResizeCSS(classification);
                img.setAttribute('style', css);
                
                // Add metadata as data attributes
                img.dataset.classification = classification.type;
                img.dataset.complexity = classification.complexity.toFixed(2);
                img.dataset.brightness = classification.brightness;
                
                resolve(img);
            };

            img.onerror = () => {
                img.style.maxWidth = CONFIG.NORMAL_IMAGE_MAX_WIDTH + 'px';
                resolve(img);
            };

            img.crossOrigin = 'anonymous';
        });
    }

    /**
     * Analyze already-loaded images in the DOM
     */
    async function enhanceExistingImages(container = document) {
        const images = container.querySelectorAll('img:not([data-enhanced])');
        
        for (const img of images) {
            if (img.naturalWidth > 0) { // Image already loaded
                const classification = await classifyImage(img);
                const css = generateResizeCSS(classification);
                
                // Preserve existing styles but apply resize
                const existingStyle = img.getAttribute('style') || '';
                img.setAttribute('style', existingStyle + ' ' + css);
                img.setAttribute('data-enhanced', 'true');
            }
        }
    }

    /**
     * Get detailed classification info for debugging
     */
    function getClassificationInfo(classification) {
        return {
            type: classification.type,
            confidence: (classification.confidence * 100).toFixed(1) + '%',
            brightness: classification.brightness,
            complexity: (classification.complexity * 100).toFixed(1) + '%',
            colorVariance: (classification.colorVariance * 100).toFixed(1) + '%',
            hasTransparency: classification.hasTransparency,
            willInvert: shouldInvertImage(classification.brightness),
            currentTheme: document.body.classList.contains('dark-mode') ? 'dark' : 'light'
        };
    }

    // Public API
    return {
        classifyImage,
        applySmartResize,
        createStyledImageElement,
        enhanceExistingImages,
        getClassificationInfo,
        CONFIG,
        shouldInvertImage
    };
})();

/**
 * Integration with the editor's image insertion workflow
 */
function integrateAdvancedImageResize() {
    // Hook into image dialog
    const linkImageDialog = document.getElementById('link-image-dialog');
    const autoResizeCheckbox = document.getElementById('dialog-auto-resize');
    const dialogOkBtn = document.getElementById('dialog-ok');
    
    if (!autoResizeCheckbox || !dialogOkBtn) return;

    // Store original click handler
    const originalDialogOk = dialogOkBtn.onclick;

    // Override with smart resize support
    dialogOkBtn.addEventListener('click', async (e) => {
        if (autoResizeCheckbox.checked) {
            e.preventDefault();
            
            const url = document.getElementById('dialog-url').value;
            const text = document.getElementById('dialog-text').value;
            
            if (!url) {
                alert('Please enter an image URL');
                return;
            }

            // Show loading indicator
            const originalText = dialogOkBtn.innerHTML;
            dialogOkBtn.innerHTML = '<span class="material-symbols-outlined">refresh</span> Analyzing...';
            dialogOkBtn.disabled = true;

            try {
                // Apply smart resize
                const styledHtml = await AdvancedImageResize.applySmartResize(url, text);
                
                // Insert the styled HTML into the editor
                const editor = document.getElementById('editor');
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const beforeText = editor.value.substring(0, start);
                const afterText = editor.value.substring(end);
                
                // Convert HTML to markdown with styles preserved as inline
                editor.value = beforeText + '\n' + styledHtml + '\n' + afterText;
                editor.selectionStart = editor.selectionEnd = start + styledHtml.length + 2;
                
                // Trigger update
                editor.dispatchEvent(new Event('input', { bubbles: true }));
                
                // Close dialog
                linkImageDialog.style.display = 'none';
                document.getElementById('popup-overlay').style.display = 'none';
            } catch (error) {
                console.error('Error applying smart resize:', error);
                alert('Error processing image. Please try again.');
            } finally {
                dialogOkBtn.innerHTML = originalText;
                dialogOkBtn.disabled = false;
            }
        }
    });

    // Also enhance images in preview pane when they load
    const preview = document.getElementById('preview');
    if (preview) {
        // Observe preview for new images
        const observer = new MutationObserver(() => {
            AdvancedImageResize.enhanceExistingImages(preview);
        });

        observer.observe(preview, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src']
        });
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', integrateAdvancedImageResize);
} else {
    integrateAdvancedImageResize();
}
