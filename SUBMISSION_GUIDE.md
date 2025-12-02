# Chrome Web Store Submission Guide

Follow these steps to publish your **Next.js Detector** extension to the Chrome Web Store.

## 1. Prepare the Package

I have already created a zip file for you (see below), but if you need to do it manually:
1.  **Zip the contents** of the `antigravity-extension` folder.
2.  **Exclude** hidden files like `.git`, `.DS_Store`, and the `_metadata` folder (if you loaded it unpacked).
3.  **Important**: The `manifest.json` must be at the root of the zip file.

## 2. Developer Account

1.  Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/dev/dashboard).
2.  Sign in with your Google Account.
3.  If this is your first time, you must pay a **one-time $5 registration fee**.

## 3. Create the Item

1.  Click **"New Item"**.
2.  Upload the `nextjs-detector.zip` file.

## 4. Store Listing Details

You will need to fill in the following:

-   **Title**: Next.js Detector (Already in manifest)
-   **Summary**: Detects if the current page is running Next.js and displays the version.
-   **Description**:
    > The Next.js Detector is a developer tool that automatically detects if a website is built with the Next.js framework.
    >
    > **Features:**
    > *   **Instant Detection**: The icon lights up immediately when Next.js is detected.
    > *   **Version Display**: Shows the exact Next.js version running on the page.
    > *   **Passive & Lightweight**: Runs quietly in the background without affecting page performance.
    > *   **Privacy Focused**: No data collection.
-   **Category**: Developer Tools.
-   **Language**: English.

### Graphic Assets (Required)

You will need to upload these images. You can use the `generate_image` tool or create them yourself.
-   **Store Icon**: 128x128 pixels (PNG). *You can use `icons/icon-128-active.png`*.
-   **Screenshot**: 1280x800 or 640x400 pixels (PNG/JPEG). *Take a screenshot of the popup open on a Next.js site*.
-   **Marquee Tile (Small)**: 440x280 pixels.
-   **Marquee Tile (Large)**: 920x680 pixels.

## 5. Privacy Practices

The store requires you to declare privacy practices.

-   **Single Purpose**: "Detect Next.js framework presence and version."
-   **Permission Justification**:
    -   `activeTab`: "To access the current page URL and status when the user interacts with the extension."
    -   `scripting`: "To inject a lightweight detection script into the page context to read the Next.js version."
    -   `storage`: "To temporarily store the detected version for display in the popup."
-   **Data Usage**:
    -   Does this extension collect user data? **No**.
    -   (Uncheck all data collection boxes).

## 6. Review and Publish

1.  Click **"Submit for Review"**.
2.  Reviews usually take **24-48 hours** (sometimes longer for new accounts).
