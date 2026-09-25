import { renderHook } from '@testing-library/react';
import { type SpiritSkeletonShapeProps } from '../types';
import { useSkeletonShapeStyleProps } from '../useSkeletonShapeStyleProps';

describe('useSkeletonShapeStyleProps', () => {
  it('should return height, width and radius', () => {
    const props = { width: 100, height: 100, borderRadius: '200' } as SpiritSkeletonShapeProps;

    const { result } = renderHook(() => useSkeletonShapeStyleProps(props));

    expect(result.current.classProps).toBe('Skeleton Skeleton--shape');
    expect(result.current.skeletonShapeStyleProps).toEqual({
      '--spirit-skeleton-shape-height': '6.25rem',
      '--spirit-skeleton-shape-radius': 'var(--spirit-radius-200)',
      '--spirit-skeleton-shape-width': '6.25rem',
    });
    expect(result.current.props).not.toHaveProperty('width');
    expect(result.current.props).not.toHaveProperty('height');
    expect(result.current.props).not.toHaveProperty('borderRadius');
  });

  it('should keep percentage width and height', () => {
    const props = { width: '100%', height: '50%', borderRadius: '200' } as SpiritSkeletonShapeProps;

    const { result } = renderHook(() => useSkeletonShapeStyleProps(props));

    expect(result.current.skeletonShapeStyleProps).toEqual({
      '--spirit-skeleton-shape-height': '50%',
      '--spirit-skeleton-shape-radius': 'var(--spirit-radius-200)',
      '--spirit-skeleton-shape-width': '100%',
    });
  });

  it('should omit radius when borderRadius is missing', () => {
    const props = { width: 100, height: 100 } as SpiritSkeletonShapeProps;

    const { result } = renderHook(() => useSkeletonShapeStyleProps(props));

    expect(result.current.skeletonShapeStyleProps).toEqual({
      '--spirit-skeleton-shape-height': '6.25rem',
      '--spirit-skeleton-shape-width': '6.25rem',
    });
  });

  it('should return a responsive radius', () => {
    const props = {
      width: 100,
      height: 100,
      borderRadius: { mobile: '100', tablet: '400', desktop: '500' },
    } as SpiritSkeletonShapeProps;

    const { result } = renderHook(() => useSkeletonShapeStyleProps(props));

    expect(result.current.skeletonShapeStyleProps).toEqual({
      '--spirit-skeleton-shape-height': '6.25rem',
      '--spirit-skeleton-shape-radius': 'var(--spirit-radius-100)',
      '--spirit-skeleton-shape-radius-tablet': 'var(--spirit-radius-400)',
      '--spirit-skeleton-shape-radius-desktop': 'var(--spirit-radius-500)',
      '--spirit-skeleton-shape-width': '6.25rem',
    });
  });
});
