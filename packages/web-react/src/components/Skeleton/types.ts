import { type CSSProperties, type ElementType } from 'react';
import type {
  BorderRadiiDictionaryType,
  ChildrenProps,
  PolymorphicComponentProps,
  SingleOrResponsive,
  SizeExtendedDictionaryType,
  StyleProps,
} from '../../types';

export type SkeletonSize<C> = SizeExtendedDictionaryType | C;

export type SkeletonRadius<C> = SingleOrResponsive<BorderRadiiDictionaryType> | C;

/** A pixel number (converted to rem) or a percentage, for example `'100%'`. */
export type SkeletonDimension = number | `${number}%`;

export interface SkeletonProps extends ChildrenProps, StyleProps {}

export interface SkeletonStyleProps<C = void> {
  width: SkeletonDimension;
  height: SkeletonDimension;
  borderRadius?: SkeletonRadius<C>;
}

/** ===== INTERNAL API ===== */
export interface CustomizedCSSProperties extends CSSProperties {
  [key: string]: string | undefined | number;
}

export interface SkeletonBaseProps<C = void> extends SkeletonProps {
  size?: SkeletonSize<C>;
  lines?: number;
  width?: SkeletonDimension;
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
