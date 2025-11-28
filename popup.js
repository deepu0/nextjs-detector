// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');
    const versionDiv = document.getElementById('version');

    // Get current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
            // Ask background for status of this tab
            chrome.runtime.sendMessage({ type: 'GET_NEXT_JS_STATUS', tabId: activeTab.id }, (response) => {
                if (response && response.detected) {
                    statusText.textContent = 'Next.js Detected';
                    statusDot.classList.add('active');
                    if (response.version) {
                        versionDiv.textContent = `v${response.version}`;
                    } else {
                        versionDiv.textContent = 'Version unknown';
                    }
                } else {
                    statusText.textContent = 'Not Detected';
                    statusDot.classList.remove('active');
                    versionDiv.textContent = 'This page is not using Next.js';
                }
            });
        }
    });
});
