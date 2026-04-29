import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SkeletonBaseProps, type SkeletonProps } from '../../types';

export interface SkeletonStyles {
  /** className props */
  classProps: {
    root: string;
    text: string;
    heading: string;
    item: string;
  };
  /** props to be passed to the element */
  props: SkeletonProps;
}

export function useSkeletonStyleProps<C = void>(props?: Omit<SkeletonBaseProps<C>, 'lines'>): SkeletonStyles {
  const { size, ...restProps } = props || {};

  const skeletonClass = useClassNamePrefix('Skeleton');
  const skeletonSizeClass = `${skeletonClass}--${size}`;
  const skeletonTextClass = `${skeletonClass}--text`;
  const skeletonHeadingClass = `${skeletonClass}--heading`;
  const skeletonItemClass = `${skeletonClass}__item`;

  const classProps = classNames(skeletonClass, {
    [skeletonSizeClass]: size,
  });

  return {
    classProps: {
      root: classProps,
      text: skeletonTextClass,
      heading: skeletonHeadingClass,
      item: skeletonItemClass,
    },
    props: restProps,
  };
}
