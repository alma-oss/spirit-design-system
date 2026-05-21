import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { type SpiritSkeletonShapeProps } from '../../../types';
import SkeletonShape from '../SkeletonShape';
import { useSkeletonShapeStyleProps } from '../useSkeletonShapeStyleProps';

describe('SkeletonShape', () => {
  classNamePrefixProviderTest(SkeletonShape, 'Skeleton');

  stylePropsTest(SkeletonShape);

  restPropsTest(SkeletonShape, 'div');

  validHtmlAttributesTest(SkeletonShape);

  ariaAttributesTest(SkeletonShape);

  elementTypePropsTest(SkeletonShape);

  beforeEach(() => {
    render(<SkeletonShape width={100} height={100} data-testid="SkeletonShape" />);
  });

  it('should have default classname', () => {
    expect(screen.getByTestId('SkeletonShape')).toHaveClass('Skeleton--shape');
  });

  it('should return height, width, radius', () => {
    const props = { width: 100, height: 100, borderRadius: '200' } as SpiritSkeletonShapeProps;

    const { result } = renderHook(() => useSkeletonShapeStyleProps(props));

    expect(result.current.skeletonShapeStyleProps).toEqual({
      '--spirit-skeleton-shape-height': '6.25rem',
      '--spirit-skeleton-shape-radius': 'var(--spirit-radius-200)',
      '--spirit-skeleton-shape-width': '6.25rem',
    });
  });

  it('should return responsive radius', () => {
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
