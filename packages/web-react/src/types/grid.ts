import { type ElementType, type JSXElementConstructor } from 'react';
import {
  type AlignmentXExtendedDictionaryType,
  type AlignmentYExtendedDictionaryType,
  type ChildrenProps,
  type GridColumns,
  type SingleOrResponsive,
  type SpaceToken,
  type SpiritPolymorphicElementPropsWithRef,
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

export interface GridElementTypeProps<T extends ElementType = 'div'> {
  /**
   * The HTML element or React element used to render the Grid, e.g. 'div'.
   *
   * @default 'div'
   */
  elementType?: T | JSXElementConstructor<unknown>;
}

export interface GridItemElementTypeProps<T extends ElementType = 'div'> {
  /**
   * The HTML element or React element used to render the GridItem, e.g. 'div'.
   *
   * @default 'div'
   */
  elementType?: T | JSXElementConstructor<unknown>;
}

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

export interface GridProps<T extends ElementType = 'div'> extends GridElementTypeProps<T>, GridCustomLayoutProps {}

export interface GridItemProps<T extends ElementType = 'div'>
  extends GridItemElementTypeProps<T>, GridItemCustomLayoutProps {}

export type SpiritGridProps<T extends ElementType = 'div'> = GridProps<T> &
  ChildrenProps &
  StyleProps &
  SpiritPolymorphicElementPropsWithRef<T, GridProps<T>>;

export type SpiritGridItemProps<T extends ElementType = 'div'> = GridItemProps<T> &
  ChildrenProps &
  StyleProps &
  SpiritPolymorphicElementPropsWithRef<T, GridItemProps<T>>;
