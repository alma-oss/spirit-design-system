const focusableElements = [
  'input:not([type="hidden"]):not([disabled]):not([tabindex="-1"]):not([aria-hidden="true"])',
  'button:not([disabled]):not([tabindex="-1"]):not([aria-hidden="true"])',
  'select:not([disabled]):not([tabindex="-1"]):not([aria-hidden="true"])',
  'textarea:not([disabled]):not([tabindex="-1"]):not([aria-hidden="true"])',
  'a[href]:not([tabindex="-1"]):not([aria-hidden="true"])',
];

/** CSS selector that matches tabbable interactive elements. */
export const FOCUSABLE_SELECTOR =
  `${focusableElements.join(':not([hidden]),')}:not([hidden]),` +
  '[tabindex]:not([tabindex="-1"]):not([disabled]):not([hidden]):not([aria-hidden="true"])';

/**
 * Returns all focusable descendant elements of the given container in DOM order.
 *
 * @param container - The root element to search within.
 * @returns {HTMLElement[]} Array of focusable elements.
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
