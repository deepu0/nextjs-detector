# Next.js Detector Chrome Extension

A Chrome extension that detects if the current page is running Next.js and displays the detected version.

## Features

- **Passive Detection**: Automatically detects Next.js on every page load.
- **Version Detection**: Extracts and displays the exact Next.js version (e.g., `v14.2.3`).
- **Visual Feedback**:
  - **Active Icon**: Black 'N' icon when Next.js is detected.
  - **Disabled Icon**: Gray icon when not detected.
- **Popup Info**: Shows "Next.js Detected" and the version number in a clean, modern popup.

## Installation

1.  Clone or download this repository.
2.  Open Chrome and go to `chrome://extensions`.
3.  Enable **Developer mode** (toggle in the top-right corner).
4.  Click **Load unpacked**.
5.  Select the directory containing this extension.

## How it Works

This extension uses a script injection technique to reliably detect Next.js:

1.  **Injection**: A small script (`inject.js`) is injected into the page's main context (Main World).
2.  **Detection**: This script checks for `window.next.version`.
3.  **Communication**: The detected version is sent via `window.postMessage` to the content script, which forwards it to the background script.
4.  **Storage**: The background script updates the icon state and stores the version in `chrome.storage.local`.
5.  **Display**: The popup reads the stored version and displays it to the user.

## Permissions

- `activeTab`: To access the current tab's ID.
- `scripting`: To inject the detection script.
- `storage`: To persist the detected version for the popup.
