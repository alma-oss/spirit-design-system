import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type SkeletonProps, type SpiritSkeletonProps } from '../../types';

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

export function useSkeletonStyleProps<E extends ElementType = 'div', C = void>(
  props?: SpiritSkeletonProps<E, C>,
): SkeletonStyles {
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
