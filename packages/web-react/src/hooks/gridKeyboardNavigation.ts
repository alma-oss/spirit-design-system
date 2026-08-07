/** Shared row-index moves for selection grids and option widgets. */
export type GridRowMove = 'next' | 'previous' | 'first' | 'last';

/**
 * Next row index for wrapped arrow / Home / End navigation.
 *
 * @param currentIndex Current focused row index
 * @param count Total row count
 * @param move Navigation move
 */
export const getWrappedRowIndex = (currentIndex: number, count: number, move: GridRowMove): number => {
  if (count <= 0) {
    return -1;
  }

  switch (move) {
    case 'next':
      return (currentIndex + 1) % count;
    case 'previous':
      return (currentIndex - 1 + count) % count;
    case 'first':
      return 0;
    case 'last':
      return count - 1;
    default:
      return -1;
  }
};

/**
 * Travel direction for a row move. Backward for `previous` / `last`, forward otherwise.
 *
 * @param move Navigation move
 */
const getMoveStep = (move: GridRowMove): 1 | -1 => {
  switch (move) {
    case 'previous':
    case 'last':
      return -1;
    case 'next':
    case 'first':
    default:
      return 1;
  }
};

/**
 * Same as `getWrappedRowIndex`, but keeps travelling in the direction of the move
 * until it lands on an enabled row. Returns `-1` when every row is disabled.
 *
 * @param currentIndex Current focused row index (`-1` when focus is outside the rows)
 * @param count Total row count
 * @param move Navigation move
 * @param isRowDisabled Whether the row at the given index is disabled
 */
export const getNextEnabledRowIndex = (
  currentIndex: number,
  count: number,
  move: GridRowMove,
  isRowDisabled: (index: number) => boolean,
): number => {
  const startIndex = getWrappedRowIndex(currentIndex, count, move);

  if (startIndex === -1) {
    return -1;
  }

  const step = getMoveStep(move);
  let index = startIndex;

  for (let visited = 0; visited < count; visited += 1) {
    if (!isRowDisabled(index)) {
      return index;
    }

    index = (index + step + count) % count;
  }

  return -1;
};

/** Pure keyboard actions for Combobox option navigation. */
export type ComboboxKeyboardAction =
  | { type: 'MOVE_DOWN' }
  | { type: 'MOVE_UP' }
  | { type: 'MOVE_HOME' }
  | { type: 'MOVE_END' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'MOVE_LEFT' }
  | { type: 'TOGGLE_ACTIVE' }
  | { type: 'OPEN_AND_FOCUS_FIRST' }
  | { type: 'OPEN_AND_FOCUS_LAST' }
  | { type: 'FOCUS_FIRST' }
  | { type: 'FOCUS_LAST' }
  | { type: 'CLOSE' }
  | { type: 'CLOSE_AND_FOCUS_INPUT' }
  | { type: 'TAB_OUT' }
  | { type: 'FOCUS_LAST_TAG' }
  | { type: 'TYPE'; key: string };

/**
 * Map a key on the combobox input to a keyboard action.
 *
 * When the popover is open, navigation keys update `aria-activedescendant` while DOM focus
 * stays on the input. Space is left for typing into the filter; Enter toggles the active option.
 * Backspace focuses the last selected tag when the filter is empty (Gmail-style; remove on next Backspace).
 *
 * @param key Event key
 * @param isOpen Whether the popover is open
 * @param hasActiveDescendant Whether an option is currently active via `aria-activedescendant`
 * @param canFocusLastTag Whether Backspace may move focus to the last selected tag (empty filter + tags)
 */
export const mapComboboxInputKeyToAction = (
  key: string,
  isOpen: boolean,
  hasActiveDescendant = false,
  canFocusLastTag = false,
): ComboboxKeyboardAction | null => {
  if (key === 'Escape') {
    return { type: 'CLOSE' };
  }

  // Tab closes the popover but must keep moving focus to the next element.
  if (key === 'Tab') {
    return { type: 'TAB_OUT' };
  }

  // Empty filter + selected tags: Backspace focuses the last tag (open or closed).
  if (key === 'Backspace' && canFocusLastTag) {
    return { type: 'FOCUS_LAST_TAG' };
  }

  if (key === 'ArrowDown') {
    if (!isOpen) {
      return { type: 'OPEN_AND_FOCUS_FIRST' };
    }

    return hasActiveDescendant ? { type: 'MOVE_DOWN' } : { type: 'FOCUS_FIRST' };
  }

  if (key === 'ArrowUp') {
    if (!isOpen) {
      return { type: 'OPEN_AND_FOCUS_LAST' };
    }

    return hasActiveDescendant ? { type: 'MOVE_UP' } : { type: 'FOCUS_LAST' };
  }

  if (!isOpen) {
    return null;
  }

  if (key === 'Home') {
    return { type: 'MOVE_HOME' };
  }

  if (key === 'End') {
    return { type: 'MOVE_END' };
  }

  if (key === 'ArrowRight') {
    return { type: 'MOVE_RIGHT' };
  }

  if (key === 'ArrowLeft') {
    return { type: 'MOVE_LEFT' };
  }

  // Enter selects/activates; Space remains available for typing in the filter.
  if (key === 'Enter' && hasActiveDescendant) {
    return { type: 'TOGGLE_ACTIVE' };
  }

  return null;
};

/**
 * Map a key inside the options widget to a keyboard action.
 *
 * @param key Event key
 * @param shiftKey Whether Shift is pressed
 */
export const mapComboboxListboxKeyToAction = (key: string, shiftKey: boolean): ComboboxKeyboardAction | null => {
  if (key === 'Escape') {
    return { type: 'CLOSE_AND_FOCUS_INPUT' };
  }

  if (key === 'Tab') {
    return shiftKey ? { type: 'CLOSE_AND_FOCUS_INPUT' } : { type: 'TAB_OUT' };
  }

  if (key === 'ArrowDown') {
    return { type: 'MOVE_DOWN' };
  }

  if (key === 'ArrowUp') {
    return { type: 'MOVE_UP' };
  }

  if (key === 'ArrowRight') {
    return { type: 'MOVE_RIGHT' };
  }

  if (key === 'ArrowLeft') {
    return { type: 'MOVE_LEFT' };
  }

  if (key === 'Home') {
    return { type: 'MOVE_HOME' };
  }

  if (key === 'End') {
    return { type: 'MOVE_END' };
  }

  if (key === 'Enter' || key === ' ') {
    return { type: 'TOGGLE_ACTIVE' };
  }

  if (key.length === 1) {
    return { type: 'TYPE', key };
  }

  return null;
};
