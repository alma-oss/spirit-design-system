import { type ElementType } from 'react';
import {
  type AlignmentXExtendedDictionaryType,
  type AlignmentYExtendedDictionaryType,
  type ChildrenProps,
  type GridColumns,
  type PolymorphicComponentProps,
  type SingleOrResponsive,
  type SpaceToken,
  type StyleProps,
} from './shared';

/** ===== BASE API ===== */
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

export interface GridBaseProps extends ChildrenProps, StyleProps {}

export interface GridItemBaseProps extends ChildrenProps, StyleProps {}

/** ===== STYLE API ===== */
export interface GridStyleProps extends GridBaseProps, GridCustomLayoutProps {}

export interface GridItemStyleProps extends GridItemBaseProps, GridItemCustomLayoutProps {}

/** ===== INTERNAL API ===== */
export interface GridProps extends GridStyleProps {}

export interface GridItemProps extends GridItemStyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritGridProps<T extends ElementType = 'div'> = PolymorphicComponentProps<T, GridProps>;

export type SpiritGridItemProps<T extends ElementType = 'div'> = PolymorphicComponentProps<T, GridItemProps>;
