import { act, renderHook } from '@testing-library/react';
import { getPickerPopoverFocusableElements, usePickerPopoverTabOutToTrigger } from '../usePickerPopoverTabOutToTrigger';

describe('usePickerPopoverTabOutToTrigger helpers', () => {
  it('should return focusables in document order', () => {
    const root = document.createElement('div');
    const first = document.createElement('input');
    const second = document.createElement('button');

    root.append(first, second);

    expect(getPickerPopoverFocusableElements(root)).toEqual([first, second]);
  });

  it('should skip disabled inputs', () => {
    const root = document.createElement('div');
    const enabled = document.createElement('input');
    const disabled = document.createElement('input');

    disabled.disabled = true;
    root.append(enabled, disabled);

    expect(getPickerPopoverFocusableElements(root)).toEqual([enabled]);
  });
});

describe('usePickerPopoverTabOutToTrigger', () => {
  it('should call onClose on Tab from last focusable when popover is open', () => {
    const onClose = jest.fn();
    const container = document.createElement('div');
    const first = document.createElement('input');
    const last = document.createElement('button');
    container.append(first, last);

    const { result } = renderHook(() =>
      usePickerPopoverTabOutToTrigger({
        isOpen: true,
        onClose,
        getLastPopoverFocusable: () => last,
      }),
    );

    const preventDefault = jest.fn();
    act(() => {
      result.current.onPopoverKeyDownCapture({
        currentTarget: container,
        key: 'Tab',
        preventDefault,
        shiftKey: false,
        target: last,
      } as never);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose on Shift+Tab from last focusable', () => {
    const onClose = jest.fn();
    const container = document.createElement('div');
    const last = document.createElement('button');
    container.append(last);

    const { result } = renderHook(() =>
      usePickerPopoverTabOutToTrigger({
        isOpen: true,
        onClose,
        getLastPopoverFocusable: () => last,
      }),
    );

    const preventDefault = jest.fn();
    act(() => {
      result.current.onPopoverKeyDownCapture({
        currentTarget: container,
        key: 'Tab',
        preventDefault,
        shiftKey: true,
        target: last,
      } as never);
    });

    expect(preventDefault).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should not call onClose when popover is closed', () => {
    const onClose = jest.fn();
    const container = document.createElement('div');
    const last = document.createElement('button');
    container.append(last);

    const { result } = renderHook(() =>
      usePickerPopoverTabOutToTrigger({
        isOpen: false,
        onClose,
        getLastPopoverFocusable: () => last,
      }),
    );

    const preventDefault = jest.fn();
    act(() => {
      result.current.onPopoverKeyDownCapture({
        currentTarget: container,
        key: 'Tab',
        preventDefault,
        shiftKey: false,
        target: last,
      } as never);
    });

    expect(preventDefault).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should not call onClose when Tab starts from non-last focusable', () => {
    const onClose = jest.fn();
    const container = document.createElement('div');
    const first = document.createElement('input');
    const last = document.createElement('button');
    container.append(first, last);

    const { result } = renderHook(() =>
      usePickerPopoverTabOutToTrigger({
        isOpen: true,
        onClose,
        getLastPopoverFocusable: () => last,
      }),
    );

    const preventDefault = jest.fn();
    act(() => {
      result.current.onPopoverKeyDownCapture({
        currentTarget: container,
        key: 'Tab',
        preventDefault,
        shiftKey: false,
        target: first,
      } as never);
    });

    expect(preventDefault).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should fallback to querying focusables when getLastPopoverFocusable is missing', () => {
    const onClose = jest.fn();
    const container = document.createElement('div');
    const first = document.createElement('input');
    const last = document.createElement('button');
    container.append(first, last);

    const { result } = renderHook(() =>
      usePickerPopoverTabOutToTrigger({
        isOpen: true,
        onClose,
      }),
    );

    const preventDefault = jest.fn();
    act(() => {
      result.current.onPopoverKeyDownCapture({
        currentTarget: container,
        key: 'Tab',
        preventDefault,
        shiftKey: false,
        target: last,
      } as never);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
