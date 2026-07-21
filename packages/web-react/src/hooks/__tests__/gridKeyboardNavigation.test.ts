import {
  getNextEnabledRowIndex,
  getWrappedRowIndex,
  mapComboboxInputKeyToAction,
  mapComboboxListboxKeyToAction,
} from '../gridKeyboardNavigation';

describe('gridKeyboardNavigation', () => {
  describe('getWrappedRowIndex', () => {
    it('should wrap next and previous indices', () => {
      expect(getWrappedRowIndex(2, 3, 'next')).toBe(0);
      expect(getWrappedRowIndex(0, 3, 'previous')).toBe(2);
      expect(getWrappedRowIndex(1, 3, 'first')).toBe(0);
      expect(getWrappedRowIndex(1, 3, 'last')).toBe(2);
    });

    it('should return -1 for empty collections', () => {
      expect(getWrappedRowIndex(0, 0, 'next')).toBe(-1);
    });
  });

  describe('getNextEnabledRowIndex', () => {
    // [enabled, disabled, enabled, disabled]
    const isRowDisabled = (index: number) => index % 2 === 1;

    it('should skip disabled rows in both directions', () => {
      expect(getNextEnabledRowIndex(0, 4, 'next', isRowDisabled)).toBe(2);
      expect(getNextEnabledRowIndex(2, 4, 'previous', isRowDisabled)).toBe(0);
    });

    it('should skip disabled rows on the edges', () => {
      expect(getNextEnabledRowIndex(-1, 4, 'first', isRowDisabled)).toBe(0);
      expect(getNextEnabledRowIndex(-1, 4, 'last', isRowDisabled)).toBe(2);
    });

    it('should wrap around past disabled rows', () => {
      expect(getNextEnabledRowIndex(2, 4, 'next', isRowDisabled)).toBe(0);
      expect(getNextEnabledRowIndex(0, 4, 'previous', isRowDisabled)).toBe(2);
    });

    it('should move off a disabled row in the direction of travel', () => {
      expect(getNextEnabledRowIndex(1, 4, 'next', isRowDisabled)).toBe(2);
      expect(getNextEnabledRowIndex(1, 4, 'previous', isRowDisabled)).toBe(0);
    });

    it('should return -1 when no row is enabled', () => {
      expect(getNextEnabledRowIndex(0, 3, 'next', () => true)).toBe(-1);
      expect(getNextEnabledRowIndex(0, 0, 'first', () => false)).toBe(-1);
    });
  });

  describe('mapComboboxInputKeyToAction', () => {
    it('should open and focus edges when closed', () => {
      expect(mapComboboxInputKeyToAction('ArrowDown', false)).toEqual({ type: 'OPEN_AND_FOCUS_FIRST' });
      expect(mapComboboxInputKeyToAction('ArrowUp', false)).toEqual({ type: 'OPEN_AND_FOCUS_LAST' });
    });

    it('should activate edges when open without an active descendant', () => {
      expect(mapComboboxInputKeyToAction('ArrowDown', true, false)).toEqual({ type: 'FOCUS_FIRST' });
      expect(mapComboboxInputKeyToAction('ArrowUp', true, false)).toEqual({ type: 'FOCUS_LAST' });
    });

    it('should move through options when open with an active descendant', () => {
      expect(mapComboboxInputKeyToAction('ArrowDown', true, true)).toEqual({ type: 'MOVE_DOWN' });
      expect(mapComboboxInputKeyToAction('ArrowUp', true, true)).toEqual({ type: 'MOVE_UP' });
      expect(mapComboboxInputKeyToAction('Enter', true, true)).toEqual({ type: 'TOGGLE_ACTIVE' });
      expect(mapComboboxInputKeyToAction('Home', true, true)).toEqual({ type: 'MOVE_HOME' });
    });

    it('should leave Space for typing in the filter input', () => {
      expect(mapComboboxInputKeyToAction(' ', true, true)).toBeNull();
    });

    it('should tab out instead of swallowing Tab', () => {
      expect(mapComboboxInputKeyToAction('Escape', true)).toEqual({ type: 'CLOSE' });
      expect(mapComboboxInputKeyToAction('Tab', true)).toEqual({ type: 'TAB_OUT' });
    });

    it('should focus the last tag on Backspace when the filter is empty', () => {
      expect(mapComboboxInputKeyToAction('Backspace', false, false, true)).toEqual({ type: 'FOCUS_LAST_TAG' });
      expect(mapComboboxInputKeyToAction('Backspace', true, true, true)).toEqual({ type: 'FOCUS_LAST_TAG' });
    });

    it('should leave Backspace for typing when the last tag cannot be focused', () => {
      expect(mapComboboxInputKeyToAction('Backspace', false)).toBeNull();
      expect(mapComboboxInputKeyToAction('Backspace', true, true, false)).toBeNull();
      expect(mapComboboxInputKeyToAction('Delete', true, false, true)).toBeNull();
    });
  });

  describe('mapComboboxListboxKeyToAction', () => {
    it('should map navigation and toggle keys', () => {
      expect(mapComboboxListboxKeyToAction('ArrowDown', false)).toEqual({ type: 'MOVE_DOWN' });
      expect(mapComboboxListboxKeyToAction('ArrowLeft', false)).toEqual({ type: 'MOVE_LEFT' });
      expect(mapComboboxListboxKeyToAction('Enter', false)).toEqual({ type: 'TOGGLE_ACTIVE' });
      expect(mapComboboxListboxKeyToAction('Tab', true)).toEqual({ type: 'CLOSE_AND_FOCUS_INPUT' });
      expect(mapComboboxListboxKeyToAction('a', false)).toEqual({ type: 'TYPE', key: 'a' });
    });
  });
});
