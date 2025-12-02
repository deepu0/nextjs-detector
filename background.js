// background.js

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "NEXT_VERSION") {
    const tabId = sender.tab.id;

    if (msg.version) {
      chrome.action.setIcon({
        tabId, path: {
          "16": "icons/icon-16-active.png",
          "48": "icons/icon-48-active.png",
          "128": "icons/icon-128-active.png"
        }
      });
    } else {
      chrome.action.setIcon({
        tabId, path: {
          "16": "icons/icon-16-disabled.png",
          "48": "icons/icon-48-disabled.png",
          "128": "icons/icon-128-disabled.png"
        }
      });
    }

    // Store the version for the popup to read
    // We use an object key based on tabId to avoid collisions
    // Using chrome.storage.local is persistent, but for tab-specific data,
    // we need to be careful about cleanup. 
    // The user requested this specific implementation, so we follow it.
    chrome.storage.local.set({ [tabId]: msg.version });
  }
});

// Clean up storage when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove(tabId.toString());
});

// Reset state on navigation (ensure icon updates immediately)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    // Reset to disabled state immediately
    chrome.action.setIcon({
      tabId, path: {
        "16": "icons/icon-16-disabled.png",
        "48": "icons/icon-48-disabled.png",
        "128": "icons/icon-128-disabled.png"
      }
    });
    // Clear stored version
    chrome.storage.local.remove(tabId.toString());
  }
});

// Inject content script on install/update to support existing tabs
chrome.runtime.onInstalled.addListener(async () => {
  const manifest = chrome.runtime.getManifest();
  const contentScripts = manifest.content_scripts;

  if (contentScripts) {
    for (const cs of contentScripts) {
      const tabs = await chrome.tabs.query({ url: cs.matches });
      for (const tab of tabs) {
        // Skip restricted pages
        if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('about:') || tab.url.startsWith('chrome-extension://')) {
          continue;
        }

        try {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: cs.js,
          });
        } catch (err) {
          // Ignore errors (e.g. cannot access tab)
        }
      }
    }
  }
});
