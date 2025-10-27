// vendor-download.js - Downloads vendor libraries for the markdown editor
async function downloadVendorLibs() {
    try {
        // Create vendor directory if it doesn't exist
        const vendorDir = document.createElement('div');
        vendorDir.innerHTML = '<button onclick="downloadAll()">Download All Vendor Files</button><div id="status"></div>';
        document.body.appendChild(vendorDir);
    } catch (err) {
        console.error('Error setting up vendor directory:', err);
    }
}

// Library URLs and filenames
const VENDOR_FILES = {
    'markdown-it': {
        url: 'https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js',
        filename: 'markdown-it.min.js'
    },
    'dompurify': {
        url: 'https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js',
        filename: 'purify.min.js'
    },
    'highlight-js': {
        url: 'https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/lib/common.min.js',
        filename: 'highlight.min.js'
    },
    'highlight-css': {
        url: 'https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/styles/default.min.css',
        filename: 'highlight.default.min.css'
    }
};

async function downloadFile(url, filename) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        
        // Create download link
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        
        return true;
    } catch (err) {
        console.error(`Error downloading ${filename}:`, err);
        return false;
    }
}

async function downloadAll() {
    const status = document.getElementById('status');
    status.innerHTML = 'Downloading vendor files...';
    
    for (const [name, info] of Object.entries(VENDOR_FILES)) {
        status.innerHTML += `<br>Downloading ${name}...`;
        await downloadFile(info.url, info.filename);
    }
    
    status.innerHTML += '<br><br>✅ Done! Please move the downloaded files to the vendor/ folder.';
}

// Initialize when page loads
window.addEventListener('load', downloadVendorLibs);