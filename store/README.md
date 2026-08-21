# Chrome Web Store materials

This directory contains the editable source, rendered artwork, and draft submission text for NAS Download Manager.

## Files

- `assets/01-send-to-nas.png` — 1280×800 store screenshot
- `assets/02-manage-tasks.png` — 1280×800 store screenshot
- `assets/small-promo-440x280.png` — required small promotional tile
- `../icons/icon-store-128.png` — padded 128×128 store icon used by the manifest
- `source/index.html` — editable source for all three graphics
- `source/style.css` — artwork styles
- `source/main.js` — selects the requested scene
- `source/popup-preview.tsx` — renders the real popup components with deterministic fixture data
- `source/popup-preview.html` — dark-mode capture page for the popup
- `source/webpack.popup-preview.cjs` — builds the popup capture page from the extension source
- `source/popup-dark-actual.png` — cropped popup render used by the second store screenshot
- `source/nas-illustration.png` — generated transparent NAS illustration
- `source/IMAGEGEN-PROMPT.md` — generation method and final prompt
- `LISTING.md` — suggested public store copy
- `PRIVACY-ANSWERS.md` — draft privacy-tab answers and permission justifications
- `REVIEWER-INSTRUCTIONS.md` — setup and test steps for a reviewer
- `SUBMISSION-CHECKLIST.md` — final checks before submission

## Editing and rendering

Rebuild the actual popup capture after changing the extension UI:

```bash
pnpm exec webpack --config store/source/webpack.popup-preview.cjs --mode production
```

Serve the repository root, open `store/source/popup-preview.html` at 425px wide, and capture the popup in dark mode. Crop only the empty page area below the popup (the current three-task fixture is 425×223) and save it as `source/popup-dark-actual.png`.

Open `source/index.html` with one of these query strings:

- `?asset=send` at 1280×800
- `?asset=manage` at 1280×800
- `?asset=promo` at 440×280

Capture the viewport at exactly the size listed. Do not add browser chrome, rounded corners, or padding around the screenshot.

## Before submission

Run:

```bash
pnpm check
pnpm package
pnpm package:sources
```

Then work through `SUBMISSION-CHECKLIST.md`. In particular, resolve the HTTP credential-transport concern before submitting and host the privacy policy at a stable public HTTPS URL.
