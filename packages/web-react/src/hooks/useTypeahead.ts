'use client';

import { useCallback, useEffect, useRef } from 'react';
import { KeyboardKey } from '../constants';

// Matches the delay screen readers and native selects use before a new search starts.
const TYPEAHEAD_TIMEOUT = 500;

export interface UseTypeaheadReturn {
  /**
   * Add a key to the search query. Returns the query, or `null` for a key that does not type a character.
   * Space is left out, as it activates the focused item.
   */
  addKey: (key: string) => string | null;
}

const getItemText = (item: HTMLElement) => (item.textContent ?? '').trim().toLocaleLowerCase();

/**
 * The item whose text starts with the query, searching forward from the current item with wrapping.
 * A single character, or the same character typed repeatedly, starts after the current item, so pressing
 * a key again cycles through the items starting with it. A longer query includes the current item.
 *
 * @param items Items in DOM order
 * @param query Typed characters
 * @param currentItem The focused item
 * @returns {HTMLElement | null} The matching item
 */
export const getTypeaheadMatch = (
  items: HTMLElement[],
  query: string,
  currentItem: HTMLElement | null,
): HTMLElement | null => {
  const normalizedQuery = query.toLocaleLowerCase();
  const isRepeated = [...normalizedQuery].every((character) => character === normalizedQuery[0]);
  const search = isRepeated ? normalizedQuery.charAt(0) : normalizedQuery;
  const currentIndex = currentItem ? items.indexOf(currentItem) : -1;
  const startIndex = search.length === 1 ? currentIndex + 1 : Math.max(currentIndex, 0);

  if (!search) {
    return null;
  }

  for (let offset = 0; offset < items.length; offset += 1) {
    const item = items[(startIndex + offset) % items.length];

    if (getItemText(item).startsWith(search)) {
      return item;
    }
  }

  return null;
};

/**
 * Collects typed characters into a search query that resets after a short pause.
 *
 * @returns {UseTypeaheadReturn} Function to add a key to the query
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/#keyboardinteraction
 */
export const useTypeahead = (): UseTypeaheadReturn => {
  const queryRef = useRef('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const addKey = useCallback((key: string) => {
    if (key.length !== 1 || key === KeyboardKey.Space) {
      return null;
    }

    clearTimeout(timeoutRef.current);
    queryRef.current += key;
    timeoutRef.current = setTimeout(() => {
      queryRef.current = '';
    }, TYPEAHEAD_TIMEOUT);

    return queryRef.current;
  }, []);

  return { addKey };
};
