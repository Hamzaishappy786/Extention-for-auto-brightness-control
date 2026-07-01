const BRT_DEFAULTS = { enabled: true, threshold: 200, intensity: 0.35 };
const BRT_STEP = 0.05;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(BRT_DEFAULTS, (stored) => chrome.storage.sync.set(stored));
});

chrome.commands.onCommand.addListener((command) => {
  chrome.storage.sync.get(BRT_DEFAULTS, (settings) => {
    if (command === 'increase-intensity') {
      settings.intensity = Math.min(1, +(settings.intensity + BRT_STEP).toFixed(2));
    } else if (command === 'decrease-intensity') {
      settings.intensity = Math.max(0, +(settings.intensity - BRT_STEP).toFixed(2));
    } else if (command === 'toggle-enabled') {
      settings.enabled = !settings.enabled;
    } else {
      return;
    }
    chrome.storage.sync.set(settings);
  });
});
