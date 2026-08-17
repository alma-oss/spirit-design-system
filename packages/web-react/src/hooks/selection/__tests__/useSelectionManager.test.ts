import { act, renderHook } from '@testing-library/react';
import { useSelectionManager } from '../useSelectionManager';

describe('useSelectionManager', () => {
  it('should toggleSelection add and remove keys', () => {
    const onSelectionChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ selectedKeys }: { selectedKeys: string[] }) =>
        useSelectionManager({ selectedKeys, onSelectionChange, selectionMode: 'multiple' }),
      { initialProps: { selectedKeys: ['cs'] } },
    );

    act(() => result.current.toggleSelection('dk'));

    expect(onSelectionChange).toHaveBeenCalledWith(['cs', 'dk']);

    onSelectionChange.mockClear();
    rerender({ selectedKeys: ['cs', 'dk'] });

    act(() => result.current.toggleSelection('cs'));

    expect(onSelectionChange).toHaveBeenCalledWith(['dk']);
  });

  it('should replaceSelection with a single key', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() =>
      useSelectionManager({
        selectedKeys: ['cs', 'dk'],
        onSelectionChange,
        selectionMode: 'multiple',
      }),
    );

    act(() => result.current.replaceSelection('en'));

    expect(onSelectionChange).toHaveBeenCalledWith(['en']);
  });

  it('should replace with the toggled key in single mode', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() =>
      useSelectionManager({
        selectedKeys: ['cs'],
        onSelectionChange,
        selectionMode: 'single',
      }),
    );

    act(() => result.current.toggleSelection('dk'));

    expect(onSelectionChange).toHaveBeenCalledWith(['dk']);
  });

  it('should report isSelected for the active selectionMode', () => {
    const { result } = renderHook(() =>
      useSelectionManager({
        selectedKeys: ['cs'],
        onSelectionChange: jest.fn(),
        selectionMode: 'single',
      }),
    );

    expect(result.current.isSelected('cs')).toBe(true);
    expect(result.current.isSelected('dk')).toBe(false);
  });

  it('should removeItem filter the key in multiple mode', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() =>
      useSelectionManager({
        selectedKeys: ['cs', 'dk'],
        onSelectionChange,
        selectionMode: 'multiple',
      }),
    );

    act(() => result.current.removeItem('cs'));

    expect(onSelectionChange).toHaveBeenCalledWith(['dk']);
  });

  it('should removeItem clear the selection in single mode', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() =>
      useSelectionManager({
        selectedKeys: ['cs'],
        onSelectionChange,
        selectionMode: 'single',
      }),
    );

    act(() => result.current.removeItem('cs'));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should removeAll clear the selection', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() =>
      useSelectionManager({
        selectedKeys: ['cs', 'dk'],
        onSelectionChange,
        selectionMode: 'multiple',
      }),
    );

    act(() => result.current.removeAll());

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });
});
