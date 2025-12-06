(() => {
    function check() {
        // Primary check: window.next.version (most reliable)
        if (window.next && window.next.version) {
            window.postMessage(
                { type: "__NEXT_VERSION__", version: window.next.version },
                "*"
            );
            return true;
        }
        // Fallback: __NEXT_DATA__ exists but version not accessible
        if (window.__NEXT_DATA__) {
            window.postMessage(
                { type: "__NEXT_VERSION__", version: "detected" },
                "*"
            );
            return true;
        }
        return false;
    }

    // Check immediately
    if (check()) return;

    // Poll for hydration delay (up to 5 seconds)
    let attempts = 0;
    const interval = setInterval(() => {
        attempts++;
        if (check() || attempts >= 10) {
            clearInterval(interval);
            // If still not found after polling, send null
            if (attempts >= 10 && !window.next && !window.__NEXT_DATA__) {
                window.postMessage(
                    { type: "__NEXT_VERSION__", version: null },
                    "*"
                );
            }
        }
    }, 500);
})();
