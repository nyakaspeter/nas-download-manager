const validAssets = new Set(["send", "manage", "promo"]);
const requestedAsset = new URLSearchParams(window.location.search).get("asset") || "send";
const asset = validAssets.has(requestedAsset) ? requestedAsset : "send";

document.documentElement.dataset.asset = asset;
document.title = `NAS Download Manager — ${asset}`;

for (const scene of document.querySelectorAll("[data-scene]")) {
  scene.hidden = scene.dataset.scene !== asset;
}
