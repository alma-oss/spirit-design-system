import { type ElementType } from 'react';
import {
  type BorderRadiiDictionaryType,
  type ChildrenProps,
  type SingleOrResponsive,
  type SizeExtendedDictionaryType,
  type StyleProps,
  type TransferProps,
} from './shared';

export interface AriaSkeletonElementTypeProps<T extends ElementType = 'div'> {
  /**
   * The HTML element or React element used to render the Skeleton, e.g. 'div', 'span'.
   *
   * @default 'div'
   */
  elementType?: T;
}

export type SkeletonSize<C> = SizeExtendedDictionaryType | C;

export type SkeletonRadius<C> = SingleOrResponsive<BorderRadiiDictionaryType> | C;

export interface SkeletonProps extends ChildrenProps, StyleProps, TransferProps {}

export interface SkeletonStyleProps<C = void> {
  width: number;
  height: number;
  borderRadius?: SkeletonRadius<C>;
}

export interface SpiritSkeletonProps<T extends ElementType = 'div', C = void>
  extends AriaSkeletonElementTypeProps<T>,
    SkeletonProps {
  size?: SkeletonSize<C>;
  lines?: number;
}

export type SkeletonShapeStyleProps<T extends ElementType = 'div', C = void> = Pick<
  SpiritSkeletonShapeProps<T, C>,
  keyof SkeletonStyleProps<C>
>;

export interface SpiritSkeletonShapeProps<T extends ElementType = 'div', C = void>
  extends AriaSkeletonElementTypeProps<T>,
    SkeletonProps,
    SkeletonStyleProps<C> {}
