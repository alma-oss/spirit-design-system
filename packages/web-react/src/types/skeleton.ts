import { type ElementType } from 'react';
import {
  type BorderRadiiDictionaryType,
  type ChildrenProps,
  type PolymorphicComponentProps,
  type SingleOrResponsive,
  type SizeExtendedDictionaryType,
  type StyleProps,
} from './shared';

export type SkeletonSize<C> = SizeExtendedDictionaryType | C;

export type SkeletonRadius<C> = SingleOrResponsive<BorderRadiiDictionaryType> | C;

export interface SkeletonProps extends ChildrenProps, StyleProps {}

export interface SkeletonStyleProps<C = void> {
  width: number;
  height: number;
  borderRadius?: SkeletonRadius<C>;
}

/** ===== INTERNAL API ===== */
export interface SkeletonBaseProps<C = void> extends SkeletonProps {
  size?: SkeletonSize<C>;
  lines?: number;
}

/** ===== PUBLIC API ===== */
export type SpiritSkeletonProps<E extends ElementType = 'div', C = void> = PolymorphicComponentProps<
  E,
  SkeletonBaseProps<C>
>;

export type SkeletonShapeStyleProps<T extends ElementType = 'div', C = void> = Pick<
  SpiritSkeletonShapeProps<T, C>,
  keyof SkeletonStyleProps<C>
>;

/** ===== INTERNAL API ===== */
export interface SkeletonShapeBaseProps<C = void> extends SkeletonProps, SkeletonStyleProps<C> {}

/** ===== PUBLIC API ===== */
export type SpiritSkeletonShapeProps<E extends ElementType = 'div', C = void> = PolymorphicComponentProps<
  E,
  SkeletonShapeBaseProps<C>
>;
