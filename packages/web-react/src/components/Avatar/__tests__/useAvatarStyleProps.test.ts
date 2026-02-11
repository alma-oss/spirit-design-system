import { renderHook } from '@testing-library/react';
import { SizesExtended } from '../../../constants';
import { useAvatarStyleProps } from '../useAvatarStyleProps';

describe('useAvatarStyleProps', () => {
  const defaultProps = { size: SizesExtended.MEDIUM }; // default size passed to the hook from the component

  it('should return defaults', () => {
    const props = { ...defaultProps };
    const { result } = renderHook(() => useAvatarStyleProps(props));

    expect(result.current.classProps).toBe('Avatar Avatar--medium');
  });

  it('should return square avatar', () => {
    const props = {
      ...defaultProps,
      isSquare: true,
    };
    const { result } = renderHook(() => useAvatarStyleProps(props));

    expect(result.current.classProps).toBe('Avatar Avatar--medium Avatar--square');
  });

  it.each(Object.values(SizesExtended))('should return %s size avatar', (size) => {
    const props = { size };
    const { result } = renderHook(() => useAvatarStyleProps(props));

    expect(result.current.classProps).toBe(`Avatar Avatar--${size}`);
  });

  it('should apply responsive size classes when responsive size is provided', () => {
    const { result } = renderHook(() =>
      useAvatarStyleProps({
        size: { mobile: 'small', tablet: 'medium', desktop: 'large' },
      }),
    );

    expect(result.current.classProps).toBe('Avatar Avatar--small Avatar--tablet--medium Avatar--desktop--large');
  });
});
