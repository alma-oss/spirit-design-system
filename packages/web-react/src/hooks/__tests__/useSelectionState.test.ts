import { act, renderHook } from '@testing-library/react';
import {
  type SelectionMode,
  getSelectedKeys,
  getToggledSelectedKeys,
  isKeySelected,
  isSingleSelectionMode,
  useSelectionState,
} from '../useSelectionState';

describe('useSelectionState', () => {
  it('should toggle item in multiple mode', () => {
    const { result } = renderHook(() => useSelectionState({ defaultSelectedKeys: ['cs'] }));

    act(() => result.current.toggleSelectedKey('dk'));

    expect(result.current.selectedKeys).toEqual(['cs', 'dk']);

    act(() => result.current.toggleSelectedKey('cs'));

    expect(result.current.selectedKeys).toEqual(['dk']);
  });

  it('should keep one item in single mode', () => {
    const { result } = renderHook(() =>
      useSelectionState({
        defaultSelectedKeys: ['cs'],
        selectionMode: 'single',
      }),
    );

    act(() => result.current.toggleSelectedKey('dk'));

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

  it('should call onSelectionChange once per toggleSelectedKey (not from inside state updater)', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() => useSelectionState({ defaultSelectedKeys: ['cs'], onSelectionChange }));

    act(() => result.current.toggleSelectedKey('dk'));

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

describe('useSelectionState helpers', () => {
  it('isSingleSelectionMode', () => {
    expect(isSingleSelectionMode('single')).toBeTruthy();
    expect(isSingleSelectionMode('multiple')).toBeFalsy();
  });

  it.each<[string[], Parameters<typeof getSelectedKeys>[1], string[]]>([
    [['cs', 'dk'], 'single', ['cs']],
    [['cs'], 'single', ['cs']],
    [[], 'single', []],
    [['cs', 'dk'], 'multiple', ['cs', 'dk']],
  ])('getSelectedKeys(%j, %s)', (keys, mode, expected) => {
    expect(getSelectedKeys(keys, mode)).toEqual(expected);
  });

  it.each<[string[], string, Parameters<typeof isKeySelected>[2], boolean]>([
    [['cs'], 'cs', 'single', true],
    [['cs'], 'dk', 'single', false],
    [['cs', 'dk'], 'dk', 'multiple', true],
    [['cs', 'dk'], 'kl', 'multiple', false],
  ])('isKeySelected(%j, %s, %s)', (selectedKeys, key, mode, expected) => {
    expect(isKeySelected(selectedKeys, key, mode)).toBe(expected);
  });

  it.each<[string[], string, Parameters<typeof getToggledSelectedKeys>[2], string[]]>([
    [['cs'], 'cs', 'single', []],
    [['cs'], 'dk', 'single', ['dk']],
    [['cs', 'dk'], 'dk', 'multiple', ['cs']],
    [['cs', 'dk'], 'kl', 'multiple', ['cs', 'dk', 'kl']],
  ])('getToggledSelectedKeys(%j, %s, %s)', (previousKeys, key, selectionMode, expected) => {
    expect(getToggledSelectedKeys(previousKeys, key, selectionMode)).toEqual(expected);
  });
});
