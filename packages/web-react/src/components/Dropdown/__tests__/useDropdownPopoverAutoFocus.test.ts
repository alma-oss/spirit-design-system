import { renderHook } from '@testing-library/react';
import { useDropdownPopoverAutoFocus } from '../useDropdownPopoverAutoFocus';

describe('useDropdownPopoverAutoFocus', () => {
  const makePopoverRef = () => {
    const container = document.createElement('div');
    const first = document.createElement('button');
    const second = document.createElement('input');

    container.append(first, second);
    document.body.append(container);

    return { ref: { current: container }, first, second, container };
  };

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should focus first focusable element when popover opens', () => {
    const { ref, first } = makePopoverRef();
    const focusSpy = jest.spyOn(first, 'focus');

    renderHook(() => useDropdownPopoverAutoFocus({ isOpen: true, popoverRef: ref }));

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('should not focus when popover is closed', () => {
    const { ref, first } = makePopoverRef();
    const focusSpy = jest.spyOn(first, 'focus');

    renderHook(() => useDropdownPopoverAutoFocus({ isOpen: false, popoverRef: ref }));

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('should not focus when there are no focusable elements', () => {
    const container = document.createElement('div');
    container.appendChild(document.createElement('span'));
    document.body.append(container);

    expect(() => {
      renderHook(() => useDropdownPopoverAutoFocus({ isOpen: true, popoverRef: { current: container } }));
    }).not.toThrow();
  });

  it('should re-focus first element when popover reopens', () => {
    const { ref, first } = makePopoverRef();
    const focusSpy = jest.spyOn(first, 'focus');

    const { rerender } = renderHook(({ isOpen }) => useDropdownPopoverAutoFocus({ isOpen, popoverRef: ref }), {
      initialProps: { isOpen: false },
    });

    expect(focusSpy).not.toHaveBeenCalled();

    rerender({ isOpen: true });

    expect(focusSpy).toHaveBeenCalledTimes(1);

    rerender({ isOpen: false });
    rerender({ isOpen: true });

    expect(focusSpy).toHaveBeenCalledTimes(2);
  });
});
