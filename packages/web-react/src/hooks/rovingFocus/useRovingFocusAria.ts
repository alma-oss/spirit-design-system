'use client';

import {
  type FocusEvent,
  type FocusEventHandler,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type RefObject,
  useEffect,
} from 'react';
import { type GridRowMove } from '../gridKeyboardNavigation';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { type RovingFocusState } from './useRovingFocusState';

export interface UseRovingFocusAriaProps<T extends HTMLElement> {
  /** Map a key to a move; `null` leaves the key alone */
  getMove: (event: KeyboardEvent<T>) => GridRowMove | null;
  onFocus?: FocusEventHandler<T>;
  onKeyDown?: KeyboardEventHandler<T>;
}

export interface UseRovingFocusAriaReturn<T extends HTMLElement> {
  rovingFocusProps: {
    onFocus: FocusEventHandler<T>;
    onKeyDown: KeyboardEventHandler<T>;
  };
}

// Attributes that change whether, and which, control of an item can get focus.
// `class` and `style` cover a control hidden through CSS without a React render.
const OBSERVED_ATTRIBUTES = ['class', 'disabled', 'hidden', 'href', 'style', 'tabindex'];

/**
 * Props for the container of a composite widget with a roving `tabindex`: focus tracking and the keys
 * returned by `getMove`. Keeps the roving `tabindex` of the state in sync with the DOM.
 *
 * @param props Hook configuration
 * @param props.getMove Map a key to a move
 * @param props.onFocus Consumer focus handler
 * @param props.onKeyDown Consumer keydown handler
 * @param state State from `useRovingFocusState`
 * @param ref Ref of the container element
 * @returns {UseRovingFocusAriaReturn} Props to spread onto the container element
 */
export const useRovingFocusAria = <T extends HTMLElement>(
  { getMove, onFocus, onKeyDown }: UseRovingFocusAriaProps<T>,
  state: RovingFocusState,
  ref: RefObject<T | null>,
): UseRovingFocusAriaReturn<T> => {
  const { getItemByControl, getItemControl, getNextItem, setActiveItem, sync } = state;

  // Runs after every render, as an item can get hidden, disabled or replaced without registering again.
  useIsomorphicLayoutEffect(() => {
    sync();
  });

  // Items can change their controls without rendering the container, and responsive props like `hideOn`
  // hide items without a render at all.
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    const observer = new MutationObserver(sync);
    observer.observe(element, { attributeFilter: OBSERVED_ATTRIBUTES, childList: true, subtree: true });
    window.addEventListener('resize', sync);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [ref, sync]);

  const handleFocus = (event: FocusEvent<T>) => {
    onFocus?.(event);

    const item = getItemByControl(event.target);

    if (item) {
      setActiveItem(item);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<T>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    // Keys pressed in other content of an item, e.g. an open popover, keep their own behavior.
    const item = getItemByControl(event.target);
    const move = getMove(event);

    if (!item || !move) {
      return;
    }

    const nextItem = getNextItem(item, move);
    const nextControl = nextItem && getItemControl(nextItem);

    if (!nextItem || !nextControl) {
      return;
    }

    event.preventDefault();
    setActiveItem(nextItem);
    nextControl.focus();
  };

  return {
    rovingFocusProps: {
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
    },
  };
};
