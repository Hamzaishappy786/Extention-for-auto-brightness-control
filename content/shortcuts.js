// Local, page-focused bonus control: hold Num Lock and tap Arrows/Enter.
// (True Num Lock hotkeys aren't exposed to chrome.commands, so this only
// works while the page has focus — the Ctrl+Shift shortcuts work globally.)

function brtToast(msg) {
  let toast = document.getElementById('brt-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'brt-toast';
    toast.className = 'brt-toast';
    (document.body || document.documentElement).appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._brtHide);
  toast._brtHide = setTimeout(() => (toast.style.opacity = '0'), 900);
}

document.addEventListener('keydown', (e) => {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
  if (!e.getModifierState('NumLock')) return;
  if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) return;

  e.preventDefault();
  chrome.storage.sync.get(BRT_DEFAULTS, (settings) => {
    if (e.key === 'ArrowUp') {
      settings.intensity = Math.min(1, +(settings.intensity + 0.05).toFixed(2));
      brtToast(`Dimmer intensity: ${Math.round(settings.intensity * 100)}%`);
    } else if (e.key === 'ArrowDown') {
      settings.intensity = Math.max(0, +(settings.intensity - 0.05).toFixed(2));
      brtToast(`Dimmer intensity: ${Math.round(settings.intensity * 100)}%`);
    } else {
      settings.enabled = !settings.enabled;
      brtToast(`Dimmer ${settings.enabled ? 'ON' : 'OFF'}`);
    }
    chrome.storage.sync.set(settings);
  });
});
