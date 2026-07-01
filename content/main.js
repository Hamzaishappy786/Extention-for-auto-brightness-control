// Orchestration: initial run, storage sync, debounced re-checks.

const BRT_DEFAULTS = { enabled: true, threshold: 200, intensity: 0.35 };
let brtSettings = { ...BRT_DEFAULTS };
let brtDebounceHandle = null;

function brtRecheck() {
  clearTimeout(brtDebounceHandle);
  brtDebounceHandle = setTimeout(() => brtApply(brtSettings), 300);
}

function brtInit() {
  chrome.storage.sync.get(BRT_DEFAULTS, (stored) => {
    brtSettings = stored;
    brtApply(brtSettings);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;
    for (const key in changes) {
      brtSettings[key] = changes[key].newValue;
    }
    brtApply(brtSettings);
  });

  // Re-check on light/dark mode toggles and attribute-driven theme changes.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', brtRecheck);

  const observer = new MutationObserver(brtRecheck);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', brtInit);
} else {
  brtInit();
}
