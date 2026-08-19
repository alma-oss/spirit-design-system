import { act, renderHook } from '@testing-library/react';
import { useCollapse } from '../useCollapse';

describe('useCollapse', () => {
  it.each([[true], [false]])('should return defaults', (isOpen) => {
    const { result } = renderHook(() => useCollapse(isOpen));

    expect(result.current.isOpen).toBe(isOpen);
    expect(typeof result.current.toggle).toBe('function');
  });

  it('should toggle state', () => {
    const isOpen = true;
    const { result } = renderHook(() => useCollapse(isOpen));
    const { toggle } = result.current;

    act(() => {
      // Argument of type 'Event' is not assignable to parameter of type 'ClickEvent'.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toggle(new Event('click'));
    });

    expect(result.current.isOpen).toBe(!isOpen);
  });

  it('should share a single id between trigger and panel aria props', () => {
    const { result } = renderHook(() => useCollapse(false, { id: 'collapse-id' }));

    expect(result.current.ariaProps.panel.id).toBe('collapse-id');
    expect(result.current.ariaProps.trigger['aria-controls']).toBe('collapse-id');
    expect(result.current.ariaProps.panel['aria-labelledby']).toBe(result.current.ariaProps.trigger.id);
  });

  it('should reflect isOpen in aria-expanded and aria-hidden', () => {
    const { result } = renderHook(() => useCollapse(false));

    expect(result.current.ariaProps.trigger['aria-expanded']).toBe(false);
    expect(result.current.ariaProps.panel['aria-hidden']).toBe(true);

    act(() => {
      // Argument of type 'Event' is not assignable to parameter of type 'ClickEvent'.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result.current.toggle(new Event('click'));
    });

    expect(result.current.ariaProps.trigger['aria-expanded']).toBe(true);
    expect(result.current.ariaProps.panel['aria-hidden']).toBe(false);
  });
});
