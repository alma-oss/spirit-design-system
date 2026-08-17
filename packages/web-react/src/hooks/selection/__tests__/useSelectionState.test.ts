import { act, renderHook } from '@testing-library/react';
import { type SelectionMode, useSelectionState } from '../useSelectionState';

describe('useSelectionState', () => {
  it('should toggle item in multiple mode', () => {
    const { result } = renderHook(() => useSelectionState({ defaultSelectedKeys: ['cs'] }));

    act(() => result.current.toggleSelection('dk'));

    expect(result.current.selectedKeys).toEqual(['cs', 'dk']);

    act(() => result.current.toggleSelection('cs'));

    expect(result.current.selectedKeys).toEqual(['dk']);
  });

  it('should replace selection with a single key', () => {
    const { result } = renderHook(() =>
      useSelectionState({
        defaultSelectedKeys: ['cs'],
        selectionMode: 'single',
      }),
    );

    act(() => result.current.replaceSelection('dk'));

    expect(result.current.selectedKeys).toEqual(['dk']);
  });

  it('should replace with the toggled key in single mode', () => {
    const { result } = renderHook(() =>
      useSelectionState({
        defaultSelectedKeys: ['cs'],
        selectionMode: 'single',
      }),
    );

    act(() => result.current.toggleSelection('dk'));

    expect(result.current.selectedKeys).toEqual(['dk']);
  });

  it('should trim defaultSelectedKeys to one key in single mode', () => {
    const { result } = renderHook(() =>
      useSelectionState({
        defaultSelectedKeys: ['cs', 'dk'],
        selectionMode: 'single',
      }),
    );

    expect(result.current.selectedKeys).toEqual(['cs']);
  });

  it('should trim setSelectedKeys to one key in single mode', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() =>
      useSelectionState({
        defaultSelectedKeys: [],
        selectionMode: 'single',
        onSelectionChange,
      }),
    );

    act(() => result.current.setSelectedKeys(['cs', 'dk']));

    expect(result.current.selectedKeys).toEqual(['cs']);
    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
  });

  it('should call onSelectionChange once per toggleSelection (not from inside state updater)', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() => useSelectionState({ defaultSelectedKeys: ['cs'], onSelectionChange }));

    act(() => result.current.toggleSelection('dk'));

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledWith(['cs', 'dk']);
  });

  it('should re-normalize selectedKeys when selectionMode changes from multiple to single', () => {
    const onSelectionChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ mode }: { mode: SelectionMode }) =>
        useSelectionState({
          defaultSelectedKeys: ['cs', 'dk'],
          onSelectionChange,
          selectionMode: mode,
        }),
      { initialProps: { mode: 'multiple' as SelectionMode } },
    );

    expect(result.current.selectedKeys).toEqual(['cs', 'dk']);

    act(() => {
      rerender({ mode: 'single' });
    });

    expect(result.current.selectedKeys).toEqual(['cs']);
    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
  });

  it('should not call onSelectionChange when selectionMode changes but selection already matches the new mode', () => {
    const onSelectionChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ mode }: { mode: SelectionMode }) =>
        useSelectionState({
          defaultSelectedKeys: ['cs'],
          onSelectionChange,
          selectionMode: mode,
        }),
      { initialProps: { mode: 'single' as SelectionMode } },
    );

    expect(result.current.selectedKeys).toEqual(['cs']);

    onSelectionChange.mockClear();

    act(() => {
      rerender({ mode: 'multiple' });
    });

    expect(result.current.selectedKeys).toEqual(['cs']);
    expect(onSelectionChange).not.toHaveBeenCalled();
  });
});
