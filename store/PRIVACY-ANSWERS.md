# Chrome Web Store privacy answers

These answers describe the current extension behavior. Recheck them against the exact build being uploaded.

## Single purpose

Allow a user to add and manage download tasks on their own Synology Download Station instance from the browser.

## Permission justifications

### `contextMenus`

Adds right-click actions for sending supported links, media URLs, and selected URLs to Download Station.

### `storage`

Stores extension preferences, NAS connection settings, optional remembered credentials, theme choice, destination history, and short-lived session state in extension-managed local or session storage.

### `notifications`

Shows an optional browser notification when a Download Station task finishes.

### `alarms`

Runs periodic background checks for task progress and completion while the extension is active.

### Host access to `http://*/*` and `https://*/*`

The user may configure a NAS at an arbitrary local or remote hostname, so the extension needs to communicate with that selected address. Page access is also used to recognize supported downloadable links and media, handle user-invoked link interception, and inspect a candidate URL when needed to determine whether it is a torrent. The extension does not retain a browsing history.

## Remote code

No. All executable JavaScript and other code is packaged with the extension. It does not download or execute remote code, use `eval`, or load a remotely hosted script.

## Data categories to disclose

Based on the current behavior, disclose at least:

- **Authentication information** — the NAS username and password entered by the user. If “Remember password” is enabled, they are stored in browser extension storage. They are transmitted only to the NAS address configured by the user.
- **Website content** — a download URL, selected URL, media URL, magnet link, or torrent chosen by the user may be processed and sent to the configured NAS to create a task.

The extension does not intentionally collect browsing history, analytics, advertising identifiers, financial information, health information, personal communications, or precise location.

## Data-use certifications

- Data is used only to provide the extension's download-management functionality.
- Data is not sold or transferred for advertising, credit, lending, or unrelated purposes.
- Data is not used for personalized advertising.
- Data is not used or transferred to determine creditworthiness.
- Humans do not read user data except where the user directly provides it for a narrowly required operational or security purpose.

## Transport-security warning

The current extension permits an HTTP NAS address and warns the user that HTTP transmits credentials without encryption. Chrome Web Store policy requires personal and sensitive user data to be handled securely. Before submission, either remove HTTP credential transport from the published build or obtain a policy-based determination that the exact behavior is acceptable. Do not claim that all credentials are encrypted in transit while HTTP remains available.

## Privacy policy URL

Publish the repository's privacy policy at a stable public HTTPS URL and paste that URL into the dashboard. The policy and the dashboard disclosures must match the uploaded build exactly.
