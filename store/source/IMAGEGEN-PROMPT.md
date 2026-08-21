# Generated visual source

`nas-illustration.png` was generated with OpenAI's built-in image generation mode and then composited into the editable HTML/CSS store artwork.

## Initial prompt

```text
Use case: product-mockup
Asset type: visual element for Chrome Web Store feature screenshots
Primary request: a polished generic four-bay home NAS appliance that visually communicates network storage and downloading
Scene/backdrop: genuinely transparent background
Subject: compact four-bay NAS enclosure in dark graphite metal, four subtle drive bay doors, small green status LEDs, a restrained glowing green downward download arrow entering the top and a warm orange secondary arrow suggesting transfer; no cables or extra props
Style/medium: premium clean 3D product illustration, crisp edges, realistic but slightly stylized, suitable for compositing into store artwork
Composition/framing: centered three-quarter view, full appliance visible, generous transparent padding
Lighting/mood: soft studio rim light, calm trustworthy technical feel
Color palette: graphite, vivid lime green, warm orange accents
Constraints: truly transparent alpha background; no text; no logos; no trademarks; no watermark; do not resemble a specific branded NAS model too closely
Avoid: busy scene, server rack, people, UI, lettering, brand marks
```

## Unused refinement prompt

The reference-edit output did not preserve a real alpha channel, so it was rejected and is not used by the store artwork.

```text
Edit this existing transparent-background product illustration. Remove only the warm orange upward-pointing arrow on the right side of the NAS and remove the orange curved/trailing line directly below that arrow. Cleanly reconstruct the small areas behind them so the background remains genuinely transparent and the NAS edge/shadow remain natural. Preserve everything else exactly: the four-bay graphite NAS, the large glowing green downward download arrow entering the top, green status lights, perspective, proportions, materials, lighting, shadows, transparent alpha background, canvas framing, and overall polished 3D style. Do not add any new objects, arrows, lines, text, logos, or watermarks.
```

## Final replacement prompt

The final project image was regenerated cleanly from this prompt and has a verified transparent alpha channel:

```text
Use case: product-mockup. Asset type: transparent visual element for Chrome Web Store feature screenshots. Create a premium clean 3D product illustration of a compact generic four-bay home NAS enclosure in dark graphite metal, with four subtle drive bay doors and small green status LEDs. A single restrained glowing vivid-lime-green downward download arrow enters the top of the NAS. There must be exactly one arrow total. Do not include any upward arrow, orange arrow, secondary arrow, curved trail, transfer line, cable, or extra prop. Centered three-quarter view, full appliance visible, generous transparent padding, crisp edges, realistic but slightly stylized, soft studio rim light, calm trustworthy technical feel. Color palette: graphite and vivid lime green only. CRITICAL: genuine transparent alpha background; do not draw or bake a gray-and-white checkerboard, white background, backdrop, floor, rectangle, or border. No text, logo, trademark, watermark, people, UI, server rack, or resemblance to a specific branded NAS model.
```
