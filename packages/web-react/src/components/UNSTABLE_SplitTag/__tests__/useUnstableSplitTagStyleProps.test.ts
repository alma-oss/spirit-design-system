import { renderHook } from '@testing-library/react';
import { useUnstableSplitTagStyleProps } from '../useUnstableSplitTagStyleProps';

describe('useUnstableSplitTagStyleProps', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useUnstableSplitTagStyleProps());

    expect(result.current.classProps).toBe('UNSTABLE_SplitTag');
  });
});
