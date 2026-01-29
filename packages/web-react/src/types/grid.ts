import { type ElementType, type JSXElementConstructor } from 'react';
import {
  type AlignmentXExtendedDictionaryType,
  type AlignmentYExtendedDictionaryType,
  type ChildrenProps,
  type GridColumns,
  type PolymorphicComponentProps,
  type PolymorphicRef,
  type SingleOrResponsive,
  type SpaceToken,
  type StyleProps,
} from './shared';

export type GridColsBreakpoints = {
  mobile?: GridColumns;
  tablet?: GridColumns;
  desktop?: GridColumns;
};
export type GridItemSpan = `span ${number}`;
export type GridItemPositionBreakpoints = {
  mobile?: number | GridItemSpan;
  tablet?: number | GridItemSpan;
  desktop?: number | GridItemSpan;
};
export type GridItemPosition = number | GridItemSpan | GridItemPositionBreakpoints;

export type GridAlignmentXType =
  | NonNullable<AlignmentXExtendedDictionaryType>
  | { [key: string]: NonNullable<AlignmentXExtendedDictionaryType> };
export type GridAlignmentYType =
  | NonNullable<AlignmentYExtendedDictionaryType>
  | { [key: string]: NonNullable<AlignmentYExtendedDictionaryType> };

export interface GridCustomLayoutProps {
  alignmentX?: GridAlignmentXType;
  alignmentY?: GridAlignmentYType;
  cols?: GridColumns | GridColsBreakpoints;
  /** Custom spacing between items */
  spacing?: SingleOrResponsive<SpaceToken>;
  /** Custom horizontal spacing between items */
  spacingX?: SingleOrResponsive<SpaceToken>;
  /** Custom vertical spacing between items */
  spacingY?: SingleOrResponsive<SpaceToken>;
}

export interface GridItemCustomLayoutProps {
  columnEnd?: GridItemPosition;
  columnStart?: GridItemPosition;
  rowEnd?: GridItemPosition;
  rowStart?: GridItemPosition;
}

export interface GridBaseProps extends GridCustomLayoutProps, ChildrenProps, StyleProps {}

export interface GridItemBaseProps extends GridItemCustomLayoutProps, ChildrenProps, StyleProps {}

export type GridProps<T extends ElementType = 'div'> = PolymorphicComponentProps<
  T | JSXElementConstructor<unknown>,
  GridBaseProps
>;

export type GridItemProps<T extends ElementType = 'div'> = PolymorphicComponentProps<
  T | JSXElementConstructor<unknown>,
  GridItemBaseProps
>;

/** @deprecated Use GridProps instead */
export type SpiritGridProps<T extends ElementType = 'div'> = GridProps<T>;

/** @deprecated Use GridItemProps instead */
export type SpiritGridItemProps<T extends ElementType = 'div'> = GridItemProps<T>;

/**
 * @internal
 * Helper type to get the correct ref type for a Grid component
 */
export type GridRef<T extends ElementType = 'div'> = PolymorphicRef<T>;

/**
 * @internal
 * Helper type to get the correct ref type for a GridItem component
 */
export type GridItemRef<T extends ElementType = 'div'> = PolymorphicRef<T>;
