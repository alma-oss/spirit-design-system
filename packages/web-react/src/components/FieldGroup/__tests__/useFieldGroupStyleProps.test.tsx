import { renderHook } from '@testing-library/react';
import { useFieldGroupStyleProps } from '../useFieldGroupStyleProps';

describe('useFieldGroupStyleProps', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useFieldGroupStyleProps());

    expect(result.current.classProps.root).toBe('border-0');
  });
});
