import { renderHook } from '@testing-library/react';
import { type SpiritHeaderProps } from '../../../types';
import { useHeaderStyleProps } from '../useHeaderStyleProps';

describe('useHeaderStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useHeaderStyleProps(props));

    expect(result.current.classProps.root).toBe('Header');
    expect(result.current.classProps.logo).toBe('HeaderLogo');
  });

  it('should return bottom divider classname', () => {
    const props = { hasBottomDivider: true } as SpiritHeaderProps;
    const { result } = renderHook(() => useHeaderStyleProps(props));

    expect(result.current.classProps.root).toBe('Header Header--bottomDivider');
  });
});
