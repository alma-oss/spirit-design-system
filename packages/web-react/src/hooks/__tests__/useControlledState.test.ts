import { act, renderHook } from '@testing-library/react';
import { useControlledState } from '../useControlledState';

describe('useControlledState', () => {
  it('should initialize to defaultValue when uncontrolled', () => {
    const { result } = renderHook(() => useControlledState<boolean>(undefined, false));

    expect(result.current[0]).toBe(false);
  });

  it('should update internal state when uncontrolled', () => {
    const { result } = renderHook(() => useControlledState<boolean>(undefined, false));

    act(() => result.current[1](true));

    expect(result.current[0]).toBe(true);
  });

  it('should always reflect value when controlled', () => {
    const { result, rerender } = renderHook(({ value }) => useControlledState<boolean>(value, false), {
      initialProps: { value: false },
    });

    act(() => result.current[1](true));

    expect(result.current[0]).toBe(false);

    rerender({ value: true });

    expect(result.current[0]).toBe(true);
  });

  it('should call onChange when uncontrolled state changes', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useControlledState<boolean>(undefined, false, onChange));

    act(() => result.current[1](true));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should call onChange when controlled setter is invoked, without mutating value', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useControlledState<boolean>(true, false, onChange));

    act(() => result.current[1](false));

    expect(onChange).toHaveBeenCalledWith(false);
    expect(result.current[0]).toBe(true);
  });

  it('should not call onChange when the value does not change', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useControlledState<boolean>(undefined, false, onChange));

    act(() => result.current[1](false));

    expect(onChange).not.toHaveBeenCalled();
  });
});
