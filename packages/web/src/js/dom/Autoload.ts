import EventHandler from './EventHandler';

// Some components need to be ready before any user interaction — a Tooltip must attach its
// hover/focus listeners, a keyboard-enabled Dropdown its keydown listener, etc. — so, unlike
// click-delegated triggers (see EventHandler.on's selector overload, which "just works" for
// markup added at any time), they must be eagerly instantiated. That eager instantiation needs to
// be re-run whenever markup is inserted outside the normal page load flow (e.g.
// `dangerouslySetInnerHTML`), since there's no click event to delegate from and hook into.
type ScanCallback = (root: Element) => void;

const scanCallbacks: ScanCallback[] = [];

/**
 * Registers a callback to (re-)run against a root element for markup that needs eager
 * instantiation. Runs once on `DOMContentLoaded`, and again whenever `loadComponents(root)` is
 * called. Internal — components call this for themselves; consumers use `loadComponents`.
 *
 * @param callback - Scan function to run against a root element.
 */
const registerAutoload = (callback: ScanCallback) => {
  scanCallbacks.push(callback);
};

EventHandler.on(window, 'DOMContentLoaded', () => {
  scanCallbacks.forEach((callback) => callback(document.documentElement));
});

/**
 * Eagerly (re-)instantiates auto-loading components (Collapse, Tooltip, ScrollView,
 * SegmentedControl, AutoResize, keyboard-enabled Dropdown, ...) found within `root`. Call this
 * after inserting Spirit markup into the DOM outside of the normal page load flow (e.g.
 * `dangerouslySetInnerHTML`).
 *
 * Click-driven triggers (`data-spirit-toggle`/`data-spirit-dismiss` on components enabled via
 * `enableToggleTrigger`/`enableDismissTrigger`) are delegated on `document` at import time and
 * need no re-binding — they already work for dynamically-inserted markup without this call.
 *
 * @param root - Element to scope the rescan to. Defaults to the whole document.
 */
const loadComponents = (root: Element = document.documentElement) => {
  scanCallbacks.forEach((callback) => callback(root));
};

export { registerAutoload, loadComponents };
