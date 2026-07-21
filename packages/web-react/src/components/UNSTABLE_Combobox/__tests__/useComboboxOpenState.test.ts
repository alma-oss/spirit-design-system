import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { useComboboxOpenState } from '../useComboboxOpenState';

describe('useComboboxOpenState', () => {
  it('should clear activeDescendantId on close', () => {
    const input = document.createElement('input');
    const inputRef = { current: input };
    const onToggle = jest.fn();
    const { result } = renderHook(() =>
      useComboboxOpenState({
        inputRef,
        isOpen: true,
        onToggle,
      }),
    );

    act(() => {
      result.current.setActiveDescendantId('combobox-test-cs');
    });

    expect(result.current.activeDescendantId).toBe('combobox-test-cs');

    act(() => {
      result.current.close();
    });

    expect(onToggle).toHaveBeenCalled();
    expect(result.current.activeDescendantId).toBeUndefined();
  });

  it('should clear activeDescendantId when isOpen becomes false', () => {
    const input = document.createElement('input');
    const inputRef = { current: input };

    const { result, rerender } = renderHook(
      ({ isOpen }) =>
        useComboboxOpenState({
          inputRef,
          isOpen,
          onToggle: jest.fn(),
        }),
      { initialProps: { isOpen: true } },
    );

    act(() => {
      result.current.setActiveDescendantId('combobox-test-cs');
    });

    rerender({ isOpen: false });

    expect(result.current.activeDescendantId).toBeUndefined();
  });
});
