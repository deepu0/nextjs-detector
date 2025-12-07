(() => {
    // Prevent multiple injections
    if (window.__NEXT_DETECTOR_INJECTED__) return;
    window.__NEXT_DETECTOR_INJECTED__ = true;

    function sendVersion() {
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

    function detectWithPolling() {
        // Check immediately
        if (sendVersion()) return;

        // Poll for hydration delay (up to 5 seconds)
        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            if (sendVersion() || attempts >= 10) {
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
    }

    // Hook into history API for SPA navigation detection
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
        originalPushState.apply(this, args);
        // Small delay to let Next.js update the page
        setTimeout(sendVersion, 100);
    };

    history.replaceState = function (...args) {
        originalReplaceState.apply(this, args);
        setTimeout(sendVersion, 100);
    };

    // Listen for back/forward navigation
    window.addEventListener('popstate', () => {
        setTimeout(sendVersion, 100);
    });

    // Listen for version request from content script
    window.addEventListener('message', (event) => {
        if (event.source === window && event.data.type === '__REQUEST_VERSION__') {
            sendVersion();
        }
    });

    // Initial detection with polling
    detectWithPolling();
})();
