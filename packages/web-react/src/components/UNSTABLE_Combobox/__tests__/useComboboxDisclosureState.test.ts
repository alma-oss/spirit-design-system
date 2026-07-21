import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { useComboboxDisclosureState } from '../useComboboxDisclosureState';

describe('useComboboxDisclosureState', () => {
  it('should open only when closed and enabled', () => {
    const onToggle = jest.fn();
    const { result } = renderHook(() =>
      useComboboxDisclosureState({
        inputRef: { current: null },
        isDisabled: false,
        isOpen: false,
        onToggle,
      }),
    );

    act(() => {
      result.current.open();
    });

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should ignore a second open() before isOpen prop catches up', () => {
    const onToggle = jest.fn();
    const { result } = renderHook(() =>
      useComboboxDisclosureState({
        inputRef: { current: null },
        isDisabled: false,
        isOpen: false,
        onToggle,
      }),
    );

    act(() => {
      result.current.open();
      result.current.open();
    });

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should clear activeDescendantId on close', () => {
    const onToggle = jest.fn();
    const { result } = renderHook(() =>
      useComboboxDisclosureState({
        inputRef: { current: null },
        isOpen: true,
        onToggle,
      }),
    );

    act(() => {
      result.current.setActiveDescendantId('option-1');
    });

    expect(result.current.activeDescendantId).toBe('option-1');

    act(() => {
      result.current.close();
    });

    expect(onToggle).toHaveBeenCalled();
    expect(result.current.activeDescendantId).toBeUndefined();
  });
});
