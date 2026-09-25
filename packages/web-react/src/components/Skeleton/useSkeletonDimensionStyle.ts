import { pxToRem } from '../../utils';
import { type CustomizedCSSProperties, type SkeletonDimension } from './types';

export const useSkeletonDimensionStyle = (
  prefix: string,
  size: SkeletonDimension | undefined,
): CustomizedCSSProperties => {
  if (size === undefined) return {};

  const propName = `--${prefix}`;

  if (typeof size === 'string') {
    if (!size.endsWith('%')) return {};

    return { [propName]: size } as CustomizedCSSProperties;
  }

  return { [propName]: pxToRem(size) } as CustomizedCSSProperties;
};
