import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { useComboboxState } from '../useComboboxState';

describe('useComboboxState', () => {
  it('should clear activeDescendantId on close', () => {
    const input = document.createElement('input');
    const inputRef = { current: input };
    const onToggle = jest.fn();
    const { result } = renderHook(() =>
      useComboboxState({
        inputRef,
        inputValue: '',
        isOpen: true,
        onInputChange: jest.fn(),
        onSelectionChange: jest.fn(),
        onToggle,
        selectedKeys: [],
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
        useComboboxState({
          inputRef,
          inputValue: '',
          isOpen,
          onInputChange: jest.fn(),
          onSelectionChange: jest.fn(),
          onToggle: jest.fn(),
          selectedKeys: [],
        }),
      { initialProps: { isOpen: true } },
    );

    act(() => {
      result.current.setActiveDescendantId('combobox-test-cs');
    });

    rerender({ isOpen: false });

    expect(result.current.activeDescendantId).toBeUndefined();
  });

  it('should expose selectedKeys as a Set for membership lookups', () => {
    const { result } = renderHook(() =>
      useComboboxState({
        inputRef: { current: null },
        inputValue: '',
        isOpen: false,
        onInputChange: jest.fn(),
        onSelectionChange: jest.fn(),
        onToggle: jest.fn(),
        selectedKeys: ['cs', 'en'],
      }),
    );

    expect(result.current.selectedKeys).toEqual(['cs', 'en']);
    expect(result.current.selectedKeysSet.has('cs')).toBe(true);
    expect(result.current.selectedKeysSet.has('de')).toBe(false);
  });

  it('should toggle selection and clear the filter input', () => {
    const onSelectionChange = jest.fn();
    const onInputChange = jest.fn();
    const { result } = renderHook(() =>
      useComboboxState({
        inputRef: { current: null },
        inputValue: 'cze',
        isOpen: true,
        onInputChange,
        onSelectionChange,
        onToggle: jest.fn(),
        selectedKeys: ['cs'],
      }),
    );

    act(() => {
      result.current.toggleOption('en');
    });

    expect(onSelectionChange).toHaveBeenCalledWith(['cs', 'en']);
    expect(onInputChange).toHaveBeenCalledWith('');
  });

  it('should not toggle a disabled option', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() =>
      useComboboxState({
        inputRef: { current: null },
        inputValue: '',
        isOpen: true,
        onInputChange: jest.fn(),
        onSelectionChange,
        onToggle: jest.fn(),
        selectedKeys: [],
      }),
    );

    act(() => {
      result.current.toggleOption('cs', { isDisabled: true });
    });

    expect(onSelectionChange).not.toHaveBeenCalled();
  });
});
