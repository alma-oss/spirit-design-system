import { renderHook } from '@testing-library/react';
import { useInputDetailsStyleProps } from '../useInputDetailsStyleProps';

describe('useInputDetailsStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useInputDetailsStyleProps(props));

    expect(result.current.classProps).toBe('InputDetails');
  });

  it('should return disabled class when disabled', () => {
    const { result } = renderHook(() => useInputDetailsStyleProps({ isDisabled: true }));

    expect(result.current.classProps).toBe('InputDetails InputDetails--disabled');
  });
});
