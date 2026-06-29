import { renderHook } from '@testing-library/react';
import { useHelperTextStyleProps } from '../useHelperTextStyleProps';

describe('useHelperTextStyleProps', () => {
  it('should return default class', () => {
    const { result } = renderHook(() => useHelperTextStyleProps({}));

    expect(result.current.classProps).toBe('HelperText');
  });

  it('should return disabled class when isDisabled is true', () => {
    const { result } = renderHook(() => useHelperTextStyleProps({ isDisabled: true }));

    expect(result.current.classProps).toBe('HelperText HelperText--disabled');
  });
});
