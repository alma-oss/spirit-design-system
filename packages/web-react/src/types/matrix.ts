import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type GridColumns,
  type PolymorphicComponentProps,
  type SingleOrResponsive,
  type SpaceToken,
  type StyleProps,
} from './shared';

export interface MatrixCustomLayoutProps {
  /** Custom columns in the matrix */
  cols?: SingleOrResponsive<GridColumns | number>;
  /** Custom number of rows for each item */
  itemRows?: SingleOrResponsive<number>;
  /** Custom rows in the matrix */
  rows?: SingleOrResponsive<number>;
  /** Custom spacing between items */
  spacing?: SingleOrResponsive<SpaceToken>;
  /** Custom horizontal spacing between items */
  spacingX?: SingleOrResponsive<SpaceToken>;
  /** Custom vertical spacing between items */
  spacingY?: SingleOrResponsive<SpaceToken>;
}

/** ===== INTERNAL API ===== */
export interface MatrixProps extends MatrixCustomLayoutProps, ChildrenProps, StyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritMatrixProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, MatrixProps>;
