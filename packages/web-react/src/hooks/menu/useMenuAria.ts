'use client';

import {
  type FocusEventHandler,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type MouseEvent,
  type MouseEventHandler,
  type RefObject,
} from 'react';
import { Direction, KeyboardKey } from '../../constants';
import { type GridRowMove } from '../gridKeyboardNavigation';
import { useRovingFocusAria } from '../rovingFocus';
import { getToolbarMove } from '../toolbar';
import { getTypeaheadMatch, useTypeahead } from '../useTypeahead';
import { type MenuState } from './useMenuState';

export interface UseMenuAriaProps<T extends HTMLElement> {
  /** Called after a menu item is activated with a click, Enter or Space */
  onAction?: () => void;
  onClick?: MouseEventHandler<T>;
  onFocus?: FocusEventHandler<T>;
  onKeyDown?: KeyboardEventHandler<T>;
  /** Called when Tab or Shift+Tab moves focus out of the menu */
  onTabOut?: () => void;
}

export interface UseMenuAriaReturn<T extends HTMLElement> {
  menuProps: {
    'aria-orientation': typeof Direction.VERTICAL;
    onClick: MouseEventHandler<T>;
    onFocus: FocusEventHandler<T>;
    onKeyDown: KeyboardEventHandler<T>;
    role: 'menu';
  };
}

/**
 * Map a key to a menu move: Up and Down with wrapping, Home and End.
 * Left and Right are left alone for submenus.
 *
 * @param key Event key
 */
export const getMenuMove = (key: string): GridRowMove | null => getToolbarMove(key, Direction.VERTICAL, false);

/**
 * Props for a menu container (`role="menu"`): a roving `tabindex` over the menu items, Up and Down
 * with wrapping, Home/End, typeahead, and callbacks for item activation and Tab out of the menu.
 *
 * @param props Hook configuration
 * @param props.onAction Called after a menu item is activated
 * @param props.onClick Consumer click handler
 * @param props.onFocus Consumer focus handler
 * @param props.onKeyDown Consumer keydown handler
 * @param props.onTabOut Called when Tab moves focus out of the menu
 * @param state Menu state from `useMenuState`
 * @param ref Ref of the menu element
 * @returns {UseMenuAriaReturn} Props to spread onto the menu element
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
 */
export const useMenuAria = <T extends HTMLElement>(
  { onAction, onClick, onFocus, onKeyDown, onTabOut }: UseMenuAriaProps<T>,
  state: MenuState,
  ref: RefObject<T | null>,
): UseMenuAriaReturn<T> => {
  const { getEnabledItems, getItemByControl, setActiveItem } = state;
  const { addKey } = useTypeahead();

  const handleKeyDown = (event: KeyboardEvent<T>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    const item = getItemByControl(event.target);

    if (!item) {
      return;
    }

    if (event.key === KeyboardKey.Tab) {
      // Focus moves on by itself, the menu only closes.
      onTabOut?.();

      return;
    }

    // Space activates a button natively, but not a link.
    if (event.key === KeyboardKey.Space && item.matches('a[href]') && getEnabledItems().includes(item)) {
      event.preventDefault();
      item.click();

      return;
    }

    const query = addKey(event.key);
    const match = query ? getTypeaheadMatch(getEnabledItems(), query, item) : null;

    if (match) {
      event.preventDefault();
      setActiveItem(match);
      match.focus();
    }
  };

  const { rovingFocusProps } = useRovingFocusAria(
    { getMove: (event) => getMenuMove(event.key), onFocus, onKeyDown: handleKeyDown },
    state,
    ref,
  );

  const handleClick = (event: MouseEvent<T>) => {
    onClick?.(event);

    // Enter and Space on a button fire a click, so this covers keyboard activation too. A prevented default
    // still counts, as client-side routing links prevent it to navigate.
    const item = getEnabledItems().find((menuItem) => menuItem.contains(event.target as Node));

    if (item) {
      onAction?.();
    }
  };

  return {
    menuProps: {
      'aria-orientation': Direction.VERTICAL,
      ...rovingFocusProps,
      onClick: handleClick,
      role: 'menu',
    },
  };
};
