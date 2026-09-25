import { type SkeletonDimension } from '../types';
import { useSkeletonDimensionStyle } from '../useSkeletonDimensionStyle';

describe('useSkeletonDimensionStyle', () => {
  it('should return an empty style when size is missing', () => {
    expect(useSkeletonDimensionStyle('spirit-skeleton-width', undefined)).toEqual({});
  });

  it('should convert a pixel size to rem', () => {
    expect(useSkeletonDimensionStyle('spirit-skeleton-width', 100)).toEqual({
      '--spirit-skeleton-width': '6.25rem',
    });
  });

  it('should convert a zero pixel size to rem', () => {
    expect(useSkeletonDimensionStyle('spirit-skeleton-width', 0)).toEqual({
      '--spirit-skeleton-width': '0rem',
    });
  });

  it('should keep a percentage', () => {
    expect(useSkeletonDimensionStyle('spirit-skeleton-width', '60%')).toEqual({
      '--spirit-skeleton-width': '60%',
    });
  });

  it('should ignore a string that is not a percentage', () => {
    expect(useSkeletonDimensionStyle('spirit-skeleton-width', '100' as SkeletonDimension)).toEqual({});
  });
});
