import { renderHook } from '@testing-library/react';
import { type SpiritSkeletonProps } from '../types';
import { useSkeletonStyleProps } from '../useSkeletonStyleProps';

describe('useSkeletonStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useSkeletonStyleProps(props));

    expect(result.current.classProps).toMatchObject({
      heading: 'Skeleton--heading',
      root: 'Skeleton',
      text: 'Skeleton--text',
    });
  });

  it.each([['xsmall'], ['small'], ['medium'], ['large'], ['xlarge']])('should return size class %s', (size) => {
    const props = { size } as SpiritSkeletonProps;
    const { result } = renderHook(() => useSkeletonStyleProps(props));

    expect(result.current.classProps.root).toBe(`Skeleton Skeleton--${size}`);
  });

  it('should pass width as a style and omit it from props', () => {
    const props = { width: '60%' } as SpiritSkeletonProps;
    const { result } = renderHook(() => useSkeletonStyleProps(props));

    expect(result.current.skeletonWidthStyleProps).toEqual({
      '--spirit-skeleton-width': '60%',
    });
    expect(result.current.props).not.toHaveProperty('width');
  });
});
