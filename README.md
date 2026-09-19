# Next.js Detector

Chrome extension (Manifest V3) that detects whether the current page runs on Next.js and shows the exact version (e.g. `v14.2.3`) — passively, on every page load.

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-live-4285F4?logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/nextjs-detector/ipfpjgnhbgimgfpjjabeafphchkhimah) [![License](https://img.shields.io/badge/license-see%20LICENSE-blue)](LICENSE)

## Install

**[Install from the Chrome Web Store](https://chromewebstore.google.com/detail/nextjs-detector/ipfpjgnhbgimgfpjjabeafphchkhimah)** — published Dec 2025, currently **69 users · 4.7/5 (3 ratings)** as of Sep 19, 2026.

### From source (development)

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the extension directory.

## Features

- **Passive Detection**: automatically detects Next.js on every page load — no clicking required.
- **Version Detection**: extracts and displays the exact Next.js version (e.g., `v14.2.3`).
- **Visual Feedback**: black 'N' icon when Next.js is detected, gray when not.
- **Popup Info**: shows "Next.js Detected" and the version in a clean popup.

## How it Works

1. **Injection**: a small script (`inject.js`) is injected into the page's main context (Main World).
2. **Detection**: it checks for `window.next.version`.
3. **Communication**: the version is sent via `window.postMessage` to the content script, which forwards it to the background script.
4. **Storage**: the background script updates the icon state and stores the version in `chrome.storage.local`.
5. **Display**: the popup reads the stored version and displays it.

## Permissions

- `activeTab` — to access the current tab's ID
- `scripting` — to inject the detection script
- `storage` — to persist the detected version for the popup

## Privacy

Detection runs entirely on your machine: the extension reads `window.next.version` from the current tab and stores the result locally. **Nothing is transmitted, logged, or uploaded.** Full policy: [PRIVACY_POLICY.md](PRIVACY_POLICY.md).

## License

See [LICENSE](LICENSE).
