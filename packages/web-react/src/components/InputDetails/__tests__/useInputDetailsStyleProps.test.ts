import { renderHook } from '@testing-library/react';
import { useInputDetailsStyleProps } from '../useInputDetailsStyleProps';

describe('useInputDetailsStyleProps', () => {
  it('should return defaults', () => {
    const props = { children: 'Content' };
    const { result } = renderHook(() => useInputDetailsStyleProps(props));

    expect(result.current.classProps).toBe('InputDetails');
  });
});
