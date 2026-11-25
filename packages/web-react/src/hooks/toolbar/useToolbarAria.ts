'use client';

import { type FocusEventHandler, type KeyboardEvent, type KeyboardEventHandler, type RefObject } from 'react';
import { Direction, KeyboardKey } from '../../constants';
import { type DirectionDictionaryType } from '../../types';
import { type GridRowMove } from '../gridKeyboardNavigation';
import { useRovingFocusAria } from '../rovingFocus';
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
  const getMove = (event: KeyboardEvent<T>) =>
    getToolbarMove(event.key, orientation, getComputedStyle(event.currentTarget).direction === 'rtl');
  const { rovingFocusProps } = useRovingFocusAria({ getMove, onFocus, onKeyDown }, state, ref);

  return {
    toolbarProps: {
      'aria-orientation': orientation,
      ...rovingFocusProps,
      role: 'toolbar',
    },
  };
};
