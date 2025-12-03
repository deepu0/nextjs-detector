// contentScript.js

function injectScript() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("inject.js");
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

// Inject immediately on load
injectScript();

// Listen for the value from the injected script
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type === "__NEXT_VERSION__") {
    chrome.runtime.sendMessage({
      type: "NEXT_VERSION",
      version: event.data.version,
    });
  }
});

// Listen for re-check requests from background (for SPA navigation)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "CHECK_NEXT_JS") {
    injectScript();
  }
});
