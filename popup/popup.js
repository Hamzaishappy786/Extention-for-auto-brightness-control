const DEFAULTS = { enabled: true, threshold: 200, intensity: 0.35 };

const enabledEl = document.getElementById('enabled');
const thresholdEl = document.getElementById('threshold');
const intensityEl = document.getElementById('intensity');
const thresholdValEl = document.getElementById('thresholdVal');
const intensityValEl = document.getElementById('intensityVal');

function refreshLabels() {
  thresholdValEl.textContent = thresholdEl.value;
  intensityValEl.textContent = intensityEl.value;
}

chrome.storage.sync.get(DEFAULTS, (settings) => {
  enabledEl.checked = settings.enabled;
  thresholdEl.value = settings.threshold;
  intensityEl.value = settings.intensity;
  refreshLabels();
});

function save() {
  refreshLabels();
  chrome.storage.sync.set({
    enabled: enabledEl.checked,
    threshold: Number(thresholdEl.value),
    intensity: Number(intensityEl.value),
  });
}

enabledEl.addEventListener('change', save);
thresholdEl.addEventListener('input', save);
intensityEl.addEventListener('input', save);
