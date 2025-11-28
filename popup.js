// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');
    const versionDiv = document.getElementById('version');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;

        chrome.storage.local.get([tabId.toString()], (res) => {
            const version = res[tabId];

            if (!version) {
                statusText.textContent = 'Not Detected';
                statusDot.classList.remove('active');
                versionDiv.textContent = 'Next.js not detected';
            } else {
                statusText.textContent = 'Next.js Detected';
                statusDot.classList.add('active');
                versionDiv.textContent = `v${version}`;
            }
        });
    });
});
