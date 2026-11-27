'use client';

import { type RovingFocusState, useRovingFocusState } from '../rovingFocus';

// An item takes part in the toolbar with its first link or button. Text fields, selects and text areas
// are left out: their arrow keys must keep moving the caret or changing the value (WCAG 2.1.1).
const ITEM_CONTROL_SELECTOR = 'a[href], button';

export type ToolbarState = RovingFocusState;

const getItemControl = (item: HTMLElement) => item.querySelector<HTMLElement>(ITEM_CONTROL_SELECTOR);

/**
 * State of a toolbar: the registered items, their order and the roving `tabindex` of their controls.
 * The first focusable item is the Tab stop until another one gets focus.
 *
 * @returns {ToolbarState} Toolbar state for `useToolbarAria`
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
 */
export const useToolbarState = (): ToolbarState => useRovingFocusState({ getItemControl });
