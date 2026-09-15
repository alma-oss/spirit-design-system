import { act, renderHook } from '@testing-library/react';
import { useThrottledValue } from '../useThrottledValue';

describe('useThrottledValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the initial value immediately on mount', () => {
    const { result } = renderHook(({ value }) => useThrottledValue(value, 200), {
      initialProps: { value: 10 },
    });

    expect(result.current).toBe(10);
  });

  it('keeps the first value while updates arrive faster than the interval', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottledValue(value, 200), {
      initialProps: { value: 10 },
    });

    rerender({ value: 20 });
    rerender({ value: 30 });

    expect(result.current).toBe(10);

    act(() => {
      jest.advanceTimersByTime(199);
    });

    expect(result.current).toBe(10);

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe(30);
  });

  it('applies a later update immediately after the interval has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottledValue(value, 200), {
      initialProps: { value: 10 },
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 80 });

    expect(result.current).toBe(80);
  });

  it('throttles object snapshots together', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottledValue(value, 200), {
      initialProps: { value: { amount: 10, label: '10 %' } },
    });

    rerender({ value: { amount: 20, label: '20 %' } });
    rerender({ value: { amount: 30, label: '30 %' } });

    expect(result.current).toEqual({ amount: 10, label: '10 %' });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toEqual({ amount: 30, label: '30 %' });
  });
});
