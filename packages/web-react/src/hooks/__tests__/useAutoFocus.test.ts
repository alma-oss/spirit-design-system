import { renderHook } from '@testing-library/react';
import { useAutoFocus } from '../useAutoFocus';

describe('useAutoFocus', () => {
  const makeContainerRef = () => {
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

  it('should focus first focusable element when activated', () => {
    const { ref, first } = makeContainerRef();
    const focusSpy = jest.spyOn(first, 'focus');

    renderHook(() => useAutoFocus({ isActive: true, containerRef: ref }));

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('should not focus when inactive', () => {
    const { ref, first } = makeContainerRef();
    const focusSpy = jest.spyOn(first, 'focus');

    renderHook(() => useAutoFocus({ isActive: false, containerRef: ref }));

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('should not throw when no focusable elements exist', () => {
    const container = document.createElement('div');
    container.appendChild(document.createElement('span'));
    document.body.append(container);

    expect(() => {
      renderHook(() => useAutoFocus({ isActive: true, containerRef: { current: container } }));
    }).not.toThrow();
  });

  it('should focus again when activated repeatedly', () => {
    const { ref, first } = makeContainerRef();
    const focusSpy = jest.spyOn(first, 'focus');

    const { rerender } = renderHook(({ isActive }) => useAutoFocus({ isActive, containerRef: ref }), {
      initialProps: { isActive: false },
    });

    expect(focusSpy).not.toHaveBeenCalled();

    rerender({ isActive: true });

    expect(focusSpy).toHaveBeenCalledTimes(1);

    rerender({ isActive: false });
    rerender({ isActive: true });

    expect(focusSpy).toHaveBeenCalledTimes(2);
  });
});
