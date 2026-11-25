'use client';

import { useCallback, useMemo, useRef } from 'react';
import { isElementHidden } from '../../utils';
import { type GridRowMove, getNextEnabledRowIndex } from '../gridKeyboardNavigation';

// `ButtonLink` marks a disabled or loading anchor with the `disabled` attribute, which `:disabled` does not match.
// A disabled link `Item` has `aria-disabled` instead.
const DISABLED_CONTROL_SELECTOR = ':disabled, [disabled], [aria-disabled="true"]';

export interface UseRovingFocusStateProps {
  /**
   * The control of an item, i.e. the element that takes focus. Pass a stable function,
   * e.g. one defined at module level.
   */
  getItemControl: (item: HTMLElement) => HTMLElement | null;
}

export interface RovingFocusState {
  /** The control of the item, i.e. the element that takes focus */
  getItemControl: (item: HTMLElement) => HTMLElement | null;
  /** The item the given element is the control of */
  getItemByControl: (element: EventTarget | null) => HTMLElement | null;
  /** The focusable items in DOM order, without disabled and hidden items */
  getEnabledItems: () => HTMLElement[];
  /** The next focusable item for the move, skipping disabled and hidden items */
  getNextItem: (item: HTMLElement | null, move: GridRowMove) => HTMLElement | null;
  /** Register an item element; returns the unregister callback */
  register: (item: HTMLElement) => () => void;
  /** Make the item the Tab stop */
  setActiveItem: (item: HTMLElement) => void;
  /** Apply the roving `tabindex` to the item controls */
  sync: () => void;
}

const compareDocumentOrder = (a: HTMLElement, b: HTMLElement) =>
  // eslint-disable-next-line no-bitwise -- `compareDocumentPosition` returns a bit mask
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

const setTabIndex = (element: HTMLElement, tabIndex: string | null) => {
  if (element.getAttribute('tabindex') === tabIndex) {
    return;
  }

  if (tabIndex === null) {
    element.removeAttribute('tabindex');
  } else {
    element.setAttribute('tabindex', tabIndex);
  }
};

/**
 * State of a composite widget with a roving `tabindex`: the registered items, their order
 * and the `tabindex` of their controls. The first focusable item is the Tab stop until another one gets focus.
 *
 * @param props Hook configuration
 * @param props.getItemControl The control of an item
 * @returns {RovingFocusState} State for `useRovingFocusAria`
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export const useRovingFocusState = ({ getItemControl }: UseRovingFocusStateProps): RovingFocusState => {
  const itemsRef = useRef<Set<HTMLElement>>(new Set());
  const activeItemRef = useRef<HTMLElement | null>(null);
  // The control that last took focus. A disabled `NavigationAction` replaces it with a span, so the
  // element is gone by the time `sync` runs and `document.activeElement` is no longer that control.
  const focusedControlRef = useRef<HTMLElement | null>(null);
  // Controls with a roving `tabindex`, mapped to the `tabindex` they had before joining
  const controlsRef = useRef<Map<HTMLElement, string | null>>(new Map());

  const getItems = useCallback(() => [...itemsRef.current].sort(compareDocumentOrder), []);

  const isItemSkipped = useCallback(
    (item: HTMLElement) => {
      const control = getItemControl(item);

      return !control || control.matches(DISABLED_CONTROL_SELECTOR) || isElementHidden(control);
    },
    [getItemControl],
  );

  const sync = useCallback(() => {
    const items = getItems();
    const activeItem = activeItemRef.current;
    const activeControl = activeItem ? getItemControl(activeItem) : null;
    const rememberedControl = focusedControlRef.current;
    // Only follow focus when it is actually on the control that can no longer take it.
    // A skipped item the user is not on keeps the roving tabindex without stealing focus.
    const activeControlHasFocus =
      activeControl != null &&
      (document.activeElement === activeControl || activeControl.contains(document.activeElement));
    // The focused control was replaced, so focus has nowhere to stay on that item.
    const focusedControlWasRemoved = rememberedControl != null && !rememberedControl.isConnected;
    const focusIsIdle =
      document.activeElement == null ||
      document.activeElement === document.body ||
      document.activeElement === rememberedControl;

    if (!activeItem || !itemsRef.current.has(activeItem) || isItemSkipped(activeItem)) {
      activeItemRef.current = items.find((item) => !isItemSkipped(item)) ?? null;
    }

    const controls = new Map<HTMLElement, string | null>();

    items.forEach((item) => {
      const control = getItemControl(item);

      if (!control) {
        return;
      }

      const initialTabIndex = controlsRef.current.has(control)
        ? (controlsRef.current.get(control) as string | null)
        : control.getAttribute('tabindex');

      controls.set(control, initialTabIndex);
      setTabIndex(control, item === activeItemRef.current ? '0' : '-1');
    });

    controlsRef.current.forEach((initialTabIndex, control) => {
      if (!controls.has(control)) {
        setTabIndex(control, initialTabIndex);
      }
    });
    controlsRef.current = controls;

    const nextControl = activeItemRef.current ? getItemControl(activeItemRef.current) : null;
    const shouldFollowFocus =
      nextControl != null &&
      nextControl !== activeControl &&
      nextControl !== rememberedControl &&
      (activeControlHasFocus || (focusedControlWasRemoved && focusIsIdle));

    if (shouldFollowFocus) {
      nextControl.focus();
      focusedControlRef.current = nextControl;
    } else if (focusedControlWasRemoved && !focusIsIdle) {
      // Focus already moved to something else; do not pull it back when this item disappears.
      focusedControlRef.current = null;
    }
  }, [getItemControl, getItems, isItemSkipped]);

  const register = useCallback(
    (item: HTMLElement) => {
      itemsRef.current.add(item);
      sync();

      return () => {
        itemsRef.current.delete(item);
        sync();
      };
    },
    [sync],
  );

  const getItemByControl = useCallback(
    (element: EventTarget | null) =>
      [...itemsRef.current].find((item) => element != null && getItemControl(item) === element) ?? null,
    [getItemControl],
  );

  const getEnabledItems = useCallback(
    () => getItems().filter((item) => !isItemSkipped(item)),
    [getItems, isItemSkipped],
  );

  const getNextItem = useCallback(
    (item: HTMLElement | null, move: GridRowMove) => {
      const items = getItems();
      const index = getNextEnabledRowIndex(item ? items.indexOf(item) : -1, items.length, move, (itemIndex) =>
        isItemSkipped(items[itemIndex]),
      );

      return items[index] ?? null;
    },
    [getItems, isItemSkipped],
  );

  const setActiveItem = useCallback(
    (item: HTMLElement) => {
      activeItemRef.current = item;
      focusedControlRef.current = getItemControl(item);
      sync();
    },
    [getItemControl, sync],
  );

  return useMemo(
    () => ({ getEnabledItems, getItemByControl, getItemControl, getNextItem, register, setActiveItem, sync }),
    [getEnabledItems, getItemByControl, getItemControl, getNextItem, register, setActiveItem, sync],
  );
};
