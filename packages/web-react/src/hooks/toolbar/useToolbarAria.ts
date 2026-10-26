'use client';

import {
  type FocusEvent,
  type FocusEventHandler,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type RefObject,
  useEffect,
} from 'react';
import { Direction, KeyboardKey } from '../../constants';
import { type DirectionDictionaryType } from '../../types';
import { type GridRowMove } from '../gridKeyboardNavigation';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { type ToolbarState } from './useToolbarState';

export type ToolbarOrientation = DirectionDictionaryType;

export interface UseToolbarAriaProps<T extends HTMLElement> {
  onFocus?: FocusEventHandler<T>;
  onKeyDown?: KeyboardEventHandler<T>;
  /** Which arrow keys move the focus */
  orientation?: ToolbarOrientation;
}

export interface UseToolbarAriaReturn<T extends HTMLElement> {
  toolbarProps: {
    'aria-orientation': ToolbarOrientation;
    onFocus: FocusEventHandler<T>;
    onKeyDown: KeyboardEventHandler<T>;
    role: 'toolbar';
  };
}

// Attributes that change whether, and which, control of an item can get focus.
// `class` and `style` cover a control hidden through CSS without a React render.
const OBSERVED_ATTRIBUTES = ['class', 'disabled', 'hidden', 'href', 'style', 'tabindex'];

/**
 * Map a key to a toolbar move; Left and Right are swapped in right-to-left layouts.
 *
 * @param key Event key
 * @param orientation Toolbar orientation
 * @param isRtl Whether the layout is right-to-left
 */
export const getToolbarMove = (key: string, orientation: ToolbarOrientation, isRtl: boolean): GridRowMove | null => {
  const isVertical = orientation === Direction.VERTICAL;

  switch (key) {
    case KeyboardKey.Home:
      return 'first';
    case KeyboardKey.End:
      return 'last';
    case KeyboardKey.ArrowDown:
      return isVertical ? 'next' : null;
    case KeyboardKey.ArrowUp:
      return isVertical ? 'previous' : null;
    case KeyboardKey.ArrowRight:
      if (isVertical) {
        return null;
      }

      return isRtl ? 'previous' : 'next';
    case KeyboardKey.ArrowLeft:
      if (isVertical) {
        return null;
      }

      return isRtl ? 'next' : 'previous';
    default:
      return null;
  }
};

/**
 * Props for a toolbar container (`role="toolbar"`): orientation, focus tracking, arrow keys matching
 * the orientation with wrapping, and Home/End. Keeps the roving `tabindex` of the state in sync with the DOM.
 *
 * @param props Hook configuration
 * @param props.onFocus Consumer focus handler
 * @param props.onKeyDown Consumer keydown handler
 * @param props.orientation Which arrow keys move the focus
 * @param state Toolbar state from `useToolbarState`
 * @param ref Ref of the toolbar element
 * @returns {UseToolbarAriaReturn} Props to spread onto the toolbar element
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
 */
export const useToolbarAria = <T extends HTMLElement>(
  { onFocus, onKeyDown, orientation = Direction.HORIZONTAL }: UseToolbarAriaProps<T>,
  state: ToolbarState,
  ref: RefObject<T | null>,
): UseToolbarAriaReturn<T> => {
  const { getItemByControl, getItemControl, getNextItem, setActiveItem, sync } = state;

  // Runs after every render, as an item can get hidden, disabled or replaced without registering again.
  useIsomorphicLayoutEffect(() => {
    sync();
  });

  // Items can change their controls without rendering the toolbar, and responsive props like `hideOn`
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
    const isRtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const move = getToolbarMove(event.key, orientation, isRtl);

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
    toolbarProps: {
      'aria-orientation': orientation,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      role: 'toolbar',
    },
  };
};
