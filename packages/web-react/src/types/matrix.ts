import { type ElementType, type JSXElementConstructor } from 'react';
import {
  type ChildrenProps,
  type GridColumns,
  type SingleOrResponsive,
  type SpaceToken,
  type StyleProps,
  type TransferProps,
} from './shared';

export interface MatrixElementTypeProps<T extends ElementType = 'div'> {
  /**
   * The HTML element or React element used to render the Matrix, e.g. 'div'.
   *
   * @default 'div'
   */
  elementType?: T | JSXElementConstructor<unknown>;
}

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

export interface MatrixProps<T extends ElementType = 'div'>
  extends MatrixElementTypeProps<T>, MatrixCustomLayoutProps {}

export interface SpiritMatrixProps<T extends ElementType = 'div'>
  extends MatrixProps<T>, ChildrenProps, StyleProps, TransferProps {}
