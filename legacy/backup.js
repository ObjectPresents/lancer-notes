// backup.js
(function () {
    function showError(message) {
        const alertBox = document.getElementById('custom-alert');
        const msg = document.getElementById('custom-alert-message');
        const okBtn = document.getElementById('custom-alert-ok');

        if (!alertBox || !msg || !okBtn) {
            // fallback to native alert if custom-alert isn't in DOM
            alert(message);
            return;
        }

        msg.textContent = message;
        alertBox.style.display = 'block';

        okBtn.onclick = function () {
            alertBox.style.display = 'none';
        };
    }

    // Show error after 1 second (only if needed)
    setTimeout(() => {
        showError("⚠️ JavaScript failed to initialize properly.");
    }, 1000);
})();
