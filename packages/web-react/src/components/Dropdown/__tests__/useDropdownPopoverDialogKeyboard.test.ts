import { act, renderHook } from '@testing-library/react';
import { getFocusableElements } from '../../../utils';
import { useDropdownPopoverDialogKeyboard } from '../useDropdownPopoverDialogKeyboard';

describe('getFocusableElements helpers', () => {
  it('should return focusable elements in document order', () => {
    const root = document.createElement('div');
    const first = document.createElement('input');
    const second = document.createElement('button');

    root.append(first, second);

    expect(getFocusableElements(root)).toEqual([first, second]);
  });

  it('should skip disabled inputs', () => {
    const root = document.createElement('div');
    const enabled = document.createElement('input');
    const disabled = document.createElement('input');

    disabled.disabled = true;
    root.append(enabled, disabled);

    expect(getFocusableElements(root)).toEqual([enabled]);
  });

  it('should ignore hidden inputs', () => {
    const root = document.createElement('div');
    const hidden = document.createElement('input');
    const visible = document.createElement('button');

    hidden.type = 'hidden';
    root.append(hidden, visible);

    expect(getFocusableElements(root)).toEqual([visible]);
  });

  it('should ignore elements with tabindex="-1"', () => {
    const root = document.createElement('div');
    const excluded = document.createElement('button');
    const included = document.createElement('button');

    excluded.setAttribute('tabindex', '-1');
    root.append(excluded, included);

    expect(getFocusableElements(root)).toEqual([included]);
  });
});

describe('useDropdownPopoverDialogKeyboard', () => {
  const makeTriggerRef = () => ({ current: document.createElement('button') });

  it('should call onToggle and focus trigger on Tab from last focusable when open', () => {
    const onToggle = jest.fn();
    const triggerRef = makeTriggerRef();
    const focusSpy = jest.spyOn(triggerRef.current, 'focus');

    const container = document.createElement('div');
    const first = document.createElement('input');
    const last = document.createElement('button');

    container.append(first, last);

    const { result } = renderHook(() => useDropdownPopoverDialogKeyboard({ isOpen: true, onToggle, triggerRef }));

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
    expect(onToggle).toHaveBeenCalledTimes(1);

    return Promise.resolve().then(() => {
      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onToggle and focus trigger on Shift+Tab from first focusable when open', () => {
    const onToggle = jest.fn();
    const triggerRef = makeTriggerRef();
    const focusSpy = jest.spyOn(triggerRef.current, 'focus');

    const container = document.createElement('div');
    const first = document.createElement('input');
    const last = document.createElement('button');

    container.append(first, last);

    const { result } = renderHook(() => useDropdownPopoverDialogKeyboard({ isOpen: true, onToggle, triggerRef }));

    const preventDefault = jest.fn();
    act(() => {
      result.current.onPopoverKeyDownCapture({
        currentTarget: container,
        key: 'Tab',
        preventDefault,
        shiftKey: true,
        target: first,
      } as never);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledTimes(1);

    return Promise.resolve().then(() => {
      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call onToggle on Shift+Tab from non-first focusable', () => {
    const onToggle = jest.fn();
    const triggerRef = makeTriggerRef();
    const container = document.createElement('div');
    const first = document.createElement('input');
    const last = document.createElement('button');

    container.append(first, last);

    const { result } = renderHook(() => useDropdownPopoverDialogKeyboard({ isOpen: true, onToggle, triggerRef }));

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
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('should not call onToggle when popover is closed', () => {
    const onToggle = jest.fn();
    const triggerRef = makeTriggerRef();
    const container = document.createElement('div');
    const last = document.createElement('button');

    container.append(last);

    const { result } = renderHook(() => useDropdownPopoverDialogKeyboard({ isOpen: false, onToggle, triggerRef }));

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
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('should not call onToggle when Tab starts from non-last focusable', () => {
    const onToggle = jest.fn();
    const triggerRef = makeTriggerRef();
    const container = document.createElement('div');
    const first = document.createElement('input');
    const last = document.createElement('button');

    container.append(first, last);

    const { result } = renderHook(() => useDropdownPopoverDialogKeyboard({ isOpen: true, onToggle, triggerRef }));

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
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('should ignore Escape key (Escape is handled at the Dropdown wrapper level)', () => {
    const onToggle = jest.fn();
    const triggerRef = makeTriggerRef();
    const container = document.createElement('div');

    const { result } = renderHook(() => useDropdownPopoverDialogKeyboard({ isOpen: true, onToggle, triggerRef }));

    const stopPropagation = jest.fn();
    act(() => {
      result.current.onPopoverKeyDownCapture({
        currentTarget: container,
        key: 'Escape',
        stopPropagation,
        shiftKey: false,
        target: container,
      } as never);
    });

    expect(stopPropagation).not.toHaveBeenCalled();
    expect(onToggle).not.toHaveBeenCalled();
  });
});
