import { act, renderHook } from '@testing-library/react';
import { useDebouncedValue } from '../useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the initial value immediately on mount', () => {
    const { result } = renderHook(({ value }) => useDebouncedValue(value, 200), {
      initialProps: { value: 'hello' },
    });

    expect(result.current).toBe('hello');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('hello');
  });

  it('updates only after the delay has passed without further changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 200), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });

    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(199);
    });

    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('b');
  });

  it('uses the latest value after rapid consecutive changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 200), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    rerender({ value: 'c' });
    rerender({ value: 'd' });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('d');
  });

  it('resets the debounce timer when the value changes again before delay elapses', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 200), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('a');

    rerender({ value: 'c' });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('c');
  });

  it('uses a new debounce interval when delay changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'x', delay: 100 },
    });

    rerender({ value: 'y', delay: 100 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('y');

    rerender({ value: 'z', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('y');

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(result.current).toBe('z');
  });
});
