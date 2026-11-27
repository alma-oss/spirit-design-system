'use client';

import { type RefObject } from 'react';
import { useRovingFocusItem } from '../rovingFocus';
import { useToolbarContext } from './ToolbarContext';

export interface UseToolbarItemReturn {
  /** Whether the item is rendered inside a toolbar */
  isInToolbar: boolean;
}

/**
 * Registers an item with the nearest `Toolbar`. The toolbar then manages the first link or button
 * of the item: its roving `tabindex`, focus tracking and arrow keys. Outside a toolbar, nothing happens.
 *
 * @param ref Ref of the item element
 * @returns {UseToolbarItemReturn} Whether the item is inside a toolbar
 */
export const useToolbarItem = <T extends HTMLElement>(ref: RefObject<T | null>): UseToolbarItemReturn => {
  const context = useToolbarContext();
  useRovingFocusItem(ref, context?.register);

  return { isInToolbar: context != null };
};
