import { renderHook } from '@testing-library/react';
import { useSplitTagStyleProps } from '../useSplitTagStyleProps';

describe('useSplitTagStyleProps', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useSplitTagStyleProps());

    expect(result.current.classProps).toBe('UNSTABLE_SplitTag');
  });
});
