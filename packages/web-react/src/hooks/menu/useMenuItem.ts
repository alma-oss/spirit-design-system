'use client';

import { type RefObject } from 'react';
import { useRovingFocusItem } from '../rovingFocus';
import { useMenuContext } from './MenuContext';

export interface UseMenuItemReturn {
  /** Whether the item is rendered inside a menu */
  isInMenu: boolean;
}

/**
 * Registers a menu item with the nearest `Menu`. The menu then manages its roving `tabindex`,
 * focus tracking, arrow keys and typeahead. Outside a menu, nothing happens.
 *
 * @param ref Ref of the menu item element
 * @returns {UseMenuItemReturn} Whether the item is inside a menu
 */
export const useMenuItem = <T extends HTMLElement>(ref: RefObject<T | null>): UseMenuItemReturn => {
  const context = useMenuContext();
  useRovingFocusItem(ref, context?.register);

  return { isInMenu: context != null };
};
