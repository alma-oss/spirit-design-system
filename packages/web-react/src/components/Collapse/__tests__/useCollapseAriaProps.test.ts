import { renderHook } from '@testing-library/react';
import { useCollapseAriaProps } from '../useCollapseAriaProps';

describe('useCollapseAriaProps', () => {
  it('should return trigger and panel aria props', () => {
    const props = {
      id: 'test-collapse-id',
      isOpen: true,
    };
    const { result } = renderHook(() => useCollapseAriaProps(props));

    expect(result.current.ariaProps).toBeDefined();
    expect(result.current.ariaProps.trigger['aria-expanded']).toBeTruthy();
    expect(result.current.ariaProps.trigger['aria-controls']).toBe(props.id);
    expect(result.current.props.id).toBe(props.id);
  });

  it('should set aria-expanded to false when closed', () => {
    const props = {
      id: 'test-collapse-id',
      isOpen: false,
    };
    const { result } = renderHook(() => useCollapseAriaProps(props));

    expect(result.current.ariaProps.trigger['aria-expanded']).toBeFalsy();
  });
});
