# Adaptive Brightness Dimmer — Store Listing

## Short description (132 char max)
Auto-dims glaring white pages and leaves dark pages alone, based on real-time background luminance detection.

## Full description

Stop squinting at blinding white pages at night. Adaptive Brightness Dimmer watches
each page's actual background color and layers a subtle, adjustable overlay only
when it's needed — no manual toggling, no messing with your OS display settings.

**How it works**
The extension samples the page's rendered background color the moment it loads and
calculates its perceived brightness. Bright pages get a soft dark overlay to cut the
glare; dark or dark-mode pages are left completely untouched. It keeps watching for
theme toggles (like a site's own light/dark switch) and re-adjusts automatically.

**Features**
- Fully automatic — detects and reacts per page, per tab
- Adjustable sensitivity threshold — decide how "bright" a page must be to trigger dimming
- Adjustable overlay intensity — from a faint tint to a strong dim
- One-click on/off toggle from the toolbar popup
- Keyboard shortcuts: Ctrl+Shift+Up/Down to nudge intensity, Ctrl+Shift+O to toggle
  (fully rebindable in chrome://extensions/shortcuts)
- Bonus: hold Num Lock + Arrow Up/Down (or Enter) for quick on-page adjustments,
  with an on-screen confirmation
- Overlay never blocks clicks, scrolling, or page interaction
- No tracking, no ads, no data collection — everything stays on your device

**Privacy**
This extension reads only the visual background color of the current page to decide
whether to dim it. It does not collect, store, or transmit any browsing data.

## Category
Accessibility / Productivity

## Permissions justification
- storage: saves your on/off state, threshold, and intensity preferences locally/synced
