// Pure helpers: no DOM mutation, safe to call often.

function brtParseRGBA(colorStr) {
  const m = colorStr.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(',').map((s) => parseFloat(s.trim()));
  const [r, g, b, a = 1] = parts;
  if (a === 0) return null; // fully transparent, ignore
  return { r, g, b };
}

// Perceived luminance, 0 (black) - 255 (white)
function brtLuminance({ r, g, b }) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Walk up from a point until a non-transparent background is found.
function brtEffectiveBgAt(x, y) {
  let el = document.elementFromPoint(x, y);
  while (el) {
    const style = getComputedStyle(el);
    const rgba = brtParseRGBA(style.backgroundColor);
    if (rgba) return rgba;
    el = el.parentElement;
  }
  return { r: 255, g: 255, b: 255 }; // default: assume light
}

// Sample a few points and average their luminance.
function brtDetectLuminance() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const points = [
    [w / 2, h / 2],
    [w / 4, h / 4],
    [(w * 3) / 4, h / 4],
  ];
  const total = points.reduce((sum, [x, y]) => sum + brtLuminance(brtEffectiveBgAt(x, y)), 0);
  return total / points.length;
}
