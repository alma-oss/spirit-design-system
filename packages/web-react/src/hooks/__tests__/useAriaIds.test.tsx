import { act, renderHook } from '@testing-library/react';
import { useAriaIds } from '../useAriaIds';

describe('useAriaIds', () => {
  it('should return empty ids when called with no argument', () => {
    const { result } = renderHook(() => useAriaIds());

    expect(result.current[0]).toEqual([]);
    expect(typeof result.current[1]).toBe('function');
  });

  it('should initialize ids from otherAriaIds string', () => {
    const { result } = renderHook(() => useAriaIds('id1 id2 id3'));

    expect(result.current[0]).toEqual(['id1', 'id2', 'id3']);
  });

  it('should add an id when register is called with add', () => {
    const { result } = renderHook(() => useAriaIds());

    act(() => {
      result.current[1]({ add: 'helper-text-id' });
    });

    expect(result.current[0]).toEqual(['helper-text-id']);
  });

  it('should add multiple ids when register is called multiple times with add', () => {
    const { result } = renderHook(() => useAriaIds());

    act(() => {
      result.current[1]({ add: 'id1' });
    });
    act(() => {
      result.current[1]({ add: 'id2' });
    });

    expect(result.current[0]).toEqual(['id1', 'id2']);
  });

  it('should remove an id when register is called with remove', () => {
    const { result } = renderHook(() => useAriaIds('id1 id2 id3'));

    act(() => {
      result.current[1]({ remove: 'id2' });
    });

    expect(result.current[0]).toEqual(['id1', 'id3']);
  });

  it('should add and remove in one register call when both are provided', () => {
    const { result } = renderHook(() => useAriaIds('id1'));

    act(() => {
      result.current[1]({ add: 'id2', remove: 'id1' });
    });

    expect(result.current[0]).toEqual(['id2']);
  });

  it('should return stable register function reference across re-renders', () => {
    const { result, rerender } = renderHook(() => useAriaIds());

    const registerFirst = result.current[1];
    rerender();
    const registerSecond = result.current[1];

    expect(registerFirst).toBe(registerSecond);
  });
});
