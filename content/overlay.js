// Overlay element + apply logic. Depends on luminance.js being loaded first.

let brtOverlayEl = null;

function brtGetOverlay() {
  if (!brtOverlayEl || !document.documentElement.contains(brtOverlayEl)) {
    brtOverlayEl = document.createElement('div');
    brtOverlayEl.className = 'brt-overlay';
    (document.body || document.documentElement).appendChild(brtOverlayEl);
  }
  return brtOverlayEl;
}

// settings: { enabled, threshold (0-255), intensity (0-1) }
function brtApply(settings) {
  const overlay = brtGetOverlay();
  if (!settings.enabled) {
    overlay.style.opacity = 0;
    return;
  }
  const luminance = brtDetectLuminance();
  const isBright = luminance >= settings.threshold;
  overlay.style.opacity = isBright ? settings.intensity : 0;
}
