// background.js

// Map to store detection status for each tab
// Key: tabId, Value: { detected: boolean, version: string | null }
const tabStatus = new Map();

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NEXT_JS_DETECTED') {
    const tabId = sender.tab.id;
    const { detected, version } = message;

    tabStatus.set(tabId, { detected, version });
    updateIcon(tabId, detected);
  }
});

// Update icon based on detection status
function updateIcon(tabId, detected) {
  const path = detected
    ? {
        "16": "icons/icon-16-active.png",
        "48": "icons/icon-48-active.png",
        "128": "icons/icon-128-active.png"
      }
    : {
        "16": "icons/icon-16-disabled.png",
        "48": "icons/icon-48-disabled.png",
        "128": "icons/icon-128-disabled.png"
      };

  chrome.action.setIcon({ tabId, path });
}

// Clean up when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  tabStatus.delete(tabId);
});

// Handle tab updates (e.g. navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    // Reset status on new navigation
    tabStatus.delete(tabId);
    updateIcon(tabId, false); // Reset to disabled state
  }
});

// Expose status to popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_NEXT_JS_STATUS') {
    // If called from popup, we need the active tab
    // But popup usually queries for the active tab itself.
    // However, the popup might pass the tabId if it knows it, or we can query it.
    // Simpler: Popup gets current tab ID and asks for status.
    if (message.tabId) {
      const status = tabStatus.get(message.tabId) || { detected: false, version: null };
      sendResponse(status);
    }
  }
});
