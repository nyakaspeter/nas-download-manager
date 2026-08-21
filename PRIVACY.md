# Privacy Policy

Synology Download Manager asks for your login credentials for your Synology NAS in order to view and manage your download tasks. Your login credentials are stored locally to the browser in a place accessible only to Synology Download Manager. Your credentials are only ever transmitted to the host you specify in the settings.

**Synology Download Manager does not collect, store or transmit any other personal information, or use your credentials except to communicate with your NAS.** In particular, Synology Download Manager does not collect any usage information and does not sync any information between browsers.

## Permission Explanations

This section explains what each permission requested by Synology Download Manager is used for. You can find the current list in [`manifest.json`](https://github.com/nyakaspeter/nas-download-manager/blob/master/manifest.json), under the `permissions` and `host_permissions` sections.

human-readable name               | source code name                | explanation
----------------------------------|---------------------------------|----------------------------------------
Access your data for all websites | `http://*/*` and `https://*/*` | Used to detect supported download links and add them to Download Station instead of opening them in a browser tab. See upstream [issue #45](https://github.com/seansfkelley/nas-download-manager/issues/45) for background.
Display notifications to you      | `notifications`                 | Used to display addition/completion notifications.
_n/a_                             | `contextMenus`                  | Used for registering itself with the right-click menu to add downloads from inside a tab.
_n/a_                             | `storage`                       | Used to allow storing credentials and settings in a place where only Synology Download Manager can access them.
_n/a_                             | `alarms`                        | Used to poll Download Station periodically while the Manifest V3 background service worker is inactive.

## Verifying Your Installation

If you are concerned that open-source extensions may not show you the same code that they actually publish to the browser add-on stores, you can follow these steps.

> These steps may be used for any other extension as well, accounting for any differences in the add-on layout or build process.

1. Ensure that you've checked out the appropriate version of the repo to compare to your version downloaded from the add-on store. You can get a list of names with `git tag`. Note that these verification instructions do not exist in all versions of the repository, so be sure to keep this copy of the instructions around.
2. Follow the instructions outlined in the [Development](./README.md#development) section of the README to build a distributable version of the addon.
3. Find the copy of this extension installed from the browser's extension store or unpack the store archive you downloaded.

4. Unzip the extension file into a folder (it may not have a `.zip` extension, but it is a zip file).
5. Inside you will see a subset of the file hierarchy that you see in your copy of the repo. All compiled JavaScript and CSS is contained in `dist`.

    If you'd like to, you can scan the other files as well and verify that there is no executable code inside them. Most of them are CSS styles or JSON configuration.

6. Now that you have the extension built from the original source as well as the source from a copy downloaded from the add-on store, you can compare them and verify they are character-for-character equal.

    A recursive diff such as `diff -r <path-to-source>/dist <path-to-downloaded-addon>/dist` should produce no output for equivalent builds.

The last step is to verify that you trust the source of this extension and its dependencies. You can of course read the source here and note that it doesn't do anything other than what it advertises. Furthermore, the dependencies are also all open-source popular libraries that are thoroughly vetted (e.g. Lodash, React).
