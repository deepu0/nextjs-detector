// contentScript.js

// Inject the reader script
const s = document.createElement("script");
s.src = chrome.runtime.getURL("inject.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

// Listen for the value
window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) return;

  if (event.data.type === "__NEXT_VERSION__") {
    chrome.runtime.sendMessage({
      type: "NEXT_VERSION",
      version: event.data.version,
    });
  }
});
