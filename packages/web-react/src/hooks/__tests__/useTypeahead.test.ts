import { act, renderHook } from '@testing-library/react';
import { getTypeaheadMatch, useTypeahead } from '../useTypeahead';

const createItems = (labels: string[]) =>
  labels.map((label) => {
    const item = document.createElement('button');
    item.textContent = label;

    return item;
  });

describe('getTypeaheadMatch', () => {
  const items = createItems(['Edit', 'Duplicate', 'Delete', ' download ']);

  it('should find the first item starting with the character', () => {
    expect(getTypeaheadMatch(items, 'd', null)).toBe(items[1]);
  });

  it('should start after the current item for a single character', () => {
    expect(getTypeaheadMatch(items, 'd', items[1])).toBe(items[2]);
  });

  it('should wrap to the beginning', () => {
    expect(getTypeaheadMatch(items, 'e', items[2])).toBe(items[0]);
  });

  it('should cycle through matches when the same character is repeated', () => {
    expect(getTypeaheadMatch(items, 'dd', items[2])).toBe(items[3]);
  });

  it('should include the current item for a longer query', () => {
    expect(getTypeaheadMatch(items, 'du', items[1])).toBe(items[1]);
    expect(getTypeaheadMatch(items, 'de', items[1])).toBe(items[2]);
  });

  it('should ignore case and surrounding whitespace', () => {
    expect(getTypeaheadMatch(items, 'DOW', null)).toBe(items[3]);
  });

  it('should return null without a match', () => {
    expect(getTypeaheadMatch(items, 'x', null)).toBeNull();
    expect(getTypeaheadMatch([], 'x', null)).toBeNull();
  });
});

describe('useTypeahead', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should collect characters into a query', () => {
    const { result } = renderHook(() => useTypeahead());

    expect(result.current.addKey('d')).toBe('d');
    expect(result.current.addKey('e')).toBe('de');
  });

  it('should reset the query after a pause', () => {
    const { result } = renderHook(() => useTypeahead());

    result.current.addKey('d');
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.addKey('e')).toBe('e');
  });

  it.each(['ArrowDown', 'Enter', ' ', 'Tab'])('should ignore %j', (key) => {
    const { result } = renderHook(() => useTypeahead());

    expect(result.current.addKey(key)).toBeNull();
  });
});
