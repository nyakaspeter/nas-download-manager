# Chrome Web Store submission checklist

## Code and package

- [ ] Confirm the version and release notes are final.
- [ ] Run `pnpm install --frozen-lockfile`.
- [ ] Run `pnpm check`.
- [ ] Run `pnpm package`.
- [ ] Run `pnpm package:sources` if source-code submission is requested.
- [ ] Install the packaged ZIP in a clean Chromium profile and repeat the core workflow.
- [ ] Confirm the ZIP contains no secrets, local settings, generated test data, or unnecessary development files.
- [ ] Confirm all executable code is bundled and the remote-code answer remains “No.”

## Policy and privacy

- [ ] Resolve the HTTP credential-transport concern before submission.
- [ ] Verify that every requested permission is still required by the uploaded build.
- [ ] Publish the privacy policy at a stable public HTTPS URL.
- [ ] Ensure the listing, privacy policy, privacy-tab disclosures, and actual behavior agree.
- [ ] Complete the single-purpose description and all permission justifications.
- [ ] Disclose authentication information and user-selected website/download content as applicable.
- [ ] Complete the publisher identity, contact, two-step verification, and trader-status requirements in the dashboard.
- [ ] Keep the independent-project and trademark disclaimer visible in the detailed description.

## Listing

- [ ] Name: `NAS Download Manager for Synology`
- [ ] Summary is within the dashboard character limit.
- [ ] Category: `Productivity`
- [ ] Language: `English`
- [ ] Paste and proofread the detailed description in `LISTING.md`.
- [ ] Add the public privacy-policy URL.
- [ ] Add any required homepage or support contact owned by the publisher.

## Artwork

- [ ] Verify `../icons/icon-store-128.png` is exactly 128×128 with transparent padding.
- [ ] Verify `assets/01-send-to-nas.png` is exactly 1280×800.
- [ ] Verify `assets/02-manage-tasks.png` is exactly 1280×800.
- [ ] Verify `assets/small-promo-440x280.png` is exactly 440×280.
- [ ] Check all images at 100% scale for clipping, artifacts, spelling, and legibility.
- [ ] Confirm screenshots accurately represent current functionality.
- [ ] Confirm the icon and artwork do not imply an official Synology product.

## Reviewer information

- [ ] Paste the applicable setup and test steps from `REVIEWER-INSTRUCTIONS.md`.
- [ ] Explain that full testing needs access to a Synology NAS running Download Station.
- [ ] If a dedicated review environment is supplied, confirm its credentials are valid, least-privileged, temporary, and delivered only through the dashboard's protected reviewer fields.

## Final review

- [ ] Review the store preview at desktop and small-card sizes.
- [ ] Confirm the final uploaded ZIP matches the tested package byte-for-byte.
- [ ] Save a copy of the submitted listing text, declarations, screenshots, and package with the release artifacts.
