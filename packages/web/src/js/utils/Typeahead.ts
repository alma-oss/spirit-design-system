// Matches the delay screen readers and native selects use before a new search starts.
const TYPEAHEAD_TIMEOUT = 500;
const KEY_SPACE = ' ';

const getItemText = (item: HTMLElement) => (item.textContent ?? '').trim().toLocaleLowerCase();

/**
 * The item whose text starts with the query, searching forward from the current item with wrapping.
 * A single character, or the same character typed repeatedly, starts after the current item, so pressing
 * a key again cycles through the items starting with it. A longer query includes the current item.
 *
 * @param items Items in DOM order
 * @param query Typed characters
 * @param currentItem The focused item
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
 */
export class Typeahead {
  query = '';

  timeout: ReturnType<typeof setTimeout> | undefined;

  /**
   * Add a key to the search query. Returns the query, or `null` for a key that does not type a character.
   * Space is left out, as it activates the focused item.
   *
   * @param key Event key
   */
  addKey(key: string): string | null {
    if (key.length !== 1 || key === KEY_SPACE) {
      return null;
    }

    clearTimeout(this.timeout);
    this.query += key;
    this.timeout = setTimeout(() => {
      this.query = '';
    }, TYPEAHEAD_TIMEOUT);

    return this.query;
  }

  dispose() {
    clearTimeout(this.timeout);
  }
}
