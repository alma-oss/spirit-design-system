'use client';

import { type RovingFocusState, useRovingFocusState } from '../rovingFocus';

export type MenuState = RovingFocusState;

// A menu item is the control itself, e.g. a `button` with `role="menuitem"`.
const getItemControl = (item: HTMLElement) => item;

/**
 * State of a menu: the registered menu items, their order and their roving `tabindex`.
 * The first focusable item is the Tab stop until another one gets focus.
 *
 * @returns {MenuState} Menu state for `useMenuAria`
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
 */
export const useMenuState = (): MenuState => useRovingFocusState({ getItemControl });
