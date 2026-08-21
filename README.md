# NAS Download Manager

An open source browser extension for adding and managing Synology Download Station tasks from your browser.

This repository is a maintained fork of [seansfkelley/nas-download-manager](https://github.com/seansfkelley/nas-download-manager). It keeps the original extension's functionality while updating it for current Chromium extension APIs and adding several quality-of-life improvements.

NAS Download Manager requires a Synology NAS running DSM 4 or newer. It is not an official Synology product.

## Changes in this fork

Compared with the upstream project at the point this fork diverged, this version includes:

- Manifest V3 support for current Chrome and Chromium-based browsers.
- A Webpack-based build that is compatible with the Manifest V3 service-worker background process.
- Alarm-based background polling and session persistence across service-worker restarts.
- A light, dark, or system-controlled theme.
- A choice between HTTPS and HTTP when connecting to a NAS. HTTPS remains strongly recommended because HTTP sends NAS credentials and traffic without transport encryption.
- More frequent popup refreshes and fixes for content-script startup and release packaging.
- pnpm-based, cross-platform development and packaging commands.
- GitHub Actions for validation, versioned release archives, GitHub Releases, and manual web-store submission.

The upstream project and its contributors remain the source of the extension's core functionality. See the [upstream repository](https://github.com/seansfkelley/nas-download-manager) for its history.

## Features

- Right-click and download media, files such as `.torrent` files, and selected URLs.
- Add, pause, resume, remove, filter, and sort download tasks from the popup.
- Choose a destination folder for new tasks.
- Clear all completed tasks with one click.
- Show system notifications when tasks complete.
- Open supported links such as `magnet:` links in the extension instead of a desktop application.
- Display the active or completed task count on the extension badge.

## Browser support

This fork targets Manifest V3 in Chrome 120 or newer and other compatible Chromium-based browsers. The original project's [Firefox Add-ons listing](https://addons.mozilla.org/en-US/firefox/addon/nas-download-manager/) and [legacy Chrome Web Store listing](https://chrome.google.com/webstore/detail/nas-download-manager/iaijiochiiocodhamehbpmdlobhgghgi) are maintained separately and do not distribute builds from this fork.

Until a store listing for this fork is available, download a package from this repository's [Releases](https://github.com/nyakaspeter/nas-download-manager/releases) or build it locally. To load an unpacked build in Chrome, open `chrome://extensions`, enable **Developer mode**, choose **Load unpacked**, and select the repository root after running `pnpm build`.

## Privacy

NAS Download Manager needs credentials for your NAS so it can communicate with Download Station. It stores extension settings locally and does not collect analytics or transmit personal information anywhere other than the NAS address you configure. See the [privacy policy and permission explanations](./PRIVACY.md).

## Development

### Prerequisites

- Node.js 20 or newer.
- [pnpm](https://pnpm.io/installation) 11 or newer. The exact version used by this repository is recorded in `package.json`.

### Install and develop

Install dependencies:

```bash
pnpm install --frozen-lockfile
```

Start Webpack in watch mode:

```bash
pnpm watch
```

Load `manifest.json` as an unpacked extension from the browser's extension debugging page. Background service-worker changes generally require reloading the extension from that page.

Run all static checks and tests:

```bash
pnpm check
```

Build an optimized production bundle:

```bash
pnpm build
```

### Package the extension

Create a production build and a store-ready archive:

```bash
pnpm package
```

Create the corresponding source archive for stores that request it:

```bash
pnpm package:sources
```

Both commands write versioned files to `artifacts/`. The extension archive contains `manifest.json` at its root and only the files needed at runtime.

## Releases and web-store publishing

The `Build` workflow validates every push and pull request and retains the packaged extension and source archives as workflow artifacts.

To prepare a release, start from a clean working tree and run:

```bash
pnpm bump-version patch
git push origin master --follow-tags
```

Use `minor` or `major` instead of `patch` when appropriate. The command updates both `manifest.json` and `package.json`, creates the version commit, and creates an annotated `v<version>` tag. Pushing that tag runs the `Release` workflow, which validates the project and attaches both archives to a GitHub Release.

Store submission is intentionally manual:

1. Create each store listing and upload its first version manually so the listing and API credentials exist.
2. Add a repository Actions secret named `SUBMIT_KEYS` containing the [Browser Platform Publisher configuration](https://github.com/PlasmoHQ/bpp#usage). Include configuration only for stores that should receive this build.
3. In GitHub Actions, run the **Submit to Web Stores** workflow for the tagged commit you want to publish.

The workflow builds from the lockfile, runs all checks, packages the extension, and passes both the runtime and source archives to Browser Platform Publisher. Store credentials remain in the encrypted GitHub secret.

## Translating the extension

To add a language, copy `_locales/en/messages.json` to `_locales/<language code>/messages.json`, translate each `message` value, import the matching Moment locale in `src/common/moment.ts`, and reload the extension to test it.

For an existing translation, `./scripts/diff-messages <language code>` prints missing entries in a copyable format.

## License

NAS Download Manager is available under the [MIT License](./LICENSE). The fork retains the upstream project's license and attribution history.
