```javascript
// contentScript.js

(function() {
  // Listen for the message from the MAIN world script (detector.js)
  window.addEventListener('message', function(event) {
    // We only accept messages from ourselves
    if (event.source !== window) return;
  
    if (event.data.type && event.data.type === 'NEXT_JS_VERSION_DETECTED') {
      // console.log('Next.js Detector: Received version from MAIN world', event.data.version);
      chrome.runtime.sendMessage({
        type: 'NEXT_JS_DETECTED',
        detected: true,
        version: event.data.version
      });
    }
  });

  // Fallback: Check for script tags if MAIN world detection fails or is blocked
  // This runs in ISOLATED world
  function fallbackDetect() {
    // We give the MAIN world script a chance to fire first.
    // But we can also check for static markers here.
    
    // Check for script src containing /_next/
    const scripts = document.getElementsByTagName('script');
    let detected = false;
    for (let script of scripts) {
      if (script.src && script.src.includes('/_next/')) {
        detected = true;
        break;
      }
    }

    if (detected) {
      // Send a generic detected message. 
      // If the MAIN world script sends a version later, it will update.
      // But to avoid overwriting a version with null, we can be careful.
      // However, background.js just updates the icon.
      // We'll let the MAIN world script take precedence for version.
      // This fallback is mainly to ensure the icon lights up.
      
      // We won't send this immediately to avoid race conditions where we send "detected: true, version: null"
      // and overwrite a "version: 1.2.3" that came just before.
      // Actually, let's just rely on the MAIN world script for version.
      // If we find markers but no version, we can send that.
      
      // Let's wait a bit? No, let's just send it.
      // chrome.runtime.sendMessage({
      //   type: 'NEXT_JS_DETECTED',
      //   detected: true,
      //   version: null
      // });
    }
  }
  
  // We'll rely primarily on detector.js now as it's more robust for version.
  // But we can keep the static check as a backup if we want.
  // For now, let's trust detector.js + polling.
})();
```
