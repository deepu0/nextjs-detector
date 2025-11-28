// detector.js
// Runs in the MAIN world, has access to window.next

(function () {
    // console.log('Next.js Detector: Injected into MAIN world.');

    function check() {
        if (window.next && window.next.version) {
            // console.log('Next.js Detector: Found window.next.version', window.next.version);
            window.postMessage({ type: 'NEXT_JS_VERSION_DETECTED', version: window.next.version }, '*');
            return true;
        }
        if (window.__NEXT_DATA__) {
            // console.log('Next.js Detector: Found window.__NEXT_DATA__');
            window.postMessage({ type: 'NEXT_JS_VERSION_DETECTED', version: null }, '*');
            return true;
        }
        return false;
    }

    // Check immediately
    if (check()) return;

    // Poll for a few seconds in case of hydration delay
    let attempts = 0;
    const interval = setInterval(() => {
        attempts++;
        if (check() || attempts > 20) { // Poll for ~10 seconds (20 * 500ms)
            clearInterval(interval);
        }
    }, 500);
})();
