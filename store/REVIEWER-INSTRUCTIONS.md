# Reviewer instructions

## Prerequisites

Full functional testing requires:

- A reachable Synology NAS
- Download Station installed and running
- A NAS account permitted to use Download Station
- At least one writable destination folder

No test NAS address or credentials are embedded in the extension or this submission package.

## Setup

1. Install the submitted extension package.
2. Open the extension popup and select Settings.
3. Enter the NAS host, port, username, and password.
4. Select HTTPS when the test NAS supports it.
5. Save the settings and verify that the popup reports a connected state.

## Suggested functional test

1. Open the add-task view and submit a benign public download URL.
2. Choose a destination folder and create the task.
3. Confirm that the new task appears in the popup.
4. Pause and resume the task.
5. Remove the task.
6. On a webpage, right-click a supported link and use the extension's Download Station action.
7. Change between light, dark, and system themes.
8. If practical, allow a small task to finish and verify the completion notification.

## Network behavior

The extension communicates with the NAS address entered by the user. When the user explicitly adds or intercepts a download, it may also inspect the selected URL to identify the content type and sends that URL to the configured Download Station instance. It does not contact an analytics or advertising backend.

## Broad site access

The content script runs on HTTP and HTTPS pages so it can recognize supported downloadable links and perform the user-configured click-interception behavior consistently. It does not retain a browsing history.

## Product relationship

This is an independent extension and is not produced, endorsed, or supported by Synology Inc.
