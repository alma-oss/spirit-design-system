/** CSS selector that matches all keyboard-reachable interactive elements. */
export const FOCUSABLE_SELECTOR =
  'input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

/**
 * Returns all focusable descendant elements of the given container in DOM order.
 *
 * @param container - The root element to search within.
 * @returns {HTMLElement[]} Array of focusable elements.
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
