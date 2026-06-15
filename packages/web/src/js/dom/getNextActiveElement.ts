/**
 * Element navigation helpers ported from Bootstrap's `js/src/util/index.js`.
 *
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/util/index.js
 */

/**
 * Returns whether an element is currently visible. Trimmed port of Bootstrap's `isVisible`
 * (the `details`/`summary` handling is omitted as the design system does not navigate inside it).
 *
 * @param element the element to test
 */
export const isVisible = (element: HTMLElement | null): boolean => {
  if (!element || element.getClientRects().length === 0) {
    return false;
  }

  return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
};

/**
 * Given a list of elements, returns the next element to activate relative to `activeElement`.
 *
 * @param list           the candidate elements, in DOM order
 * @param activeElement  the currently active element (may not be in `list`, e.g. on first open)
 * @param shouldGetNext  move forward (`true`) or backward (`false`)
 * @param isCycleAllowed wrap around the ends instead of clamping
 */
export const getNextActiveElement = (
  list: HTMLElement[],
  activeElement: HTMLElement,
  shouldGetNext: boolean,
  isCycleAllowed: boolean,
): HTMLElement => {
  const listLength = list.length;
  let index = list.indexOf(activeElement);

  // if the element does not exist in the list return an element
  // depending on the direction and if cycle is allowed
  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
  }

  index += shouldGetNext ? 1 : -1;

  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }

  return list[Math.max(0, Math.min(index, listLength - 1))];
};
