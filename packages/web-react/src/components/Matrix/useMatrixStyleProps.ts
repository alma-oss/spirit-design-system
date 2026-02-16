import { cssVariablePrefix } from '@alma-oss/spirit-design-tokens';
import classNames from 'classnames';
import { type CSSProperties, type ElementType } from 'react';
import { DirectionAxis } from '../../constants';
import { type DimensionCSSProperties, useClassNamePrefix, useDimensionStyle, useSpacingStyle } from '../../hooks';
import { type DimensionType, type SpiritMatrixProps } from '../../types';
import { MATRIX_ROWS_DEFAULT } from './constants';

export interface MatrixStyles<T> {
  /** className props */
  classProps: string;
  /** Props for the Matrix element. */
  props: T;
  /** Style props for the element */
  styleProps: CSSProperties;
}

/**
 * Generates default responsive row styles for the Matrix component.
 *
 * @param cols - The column configuration for the Matrix, which can be a dimension type or undefined.
 * @param rows - The row configuration for the Matrix, which can be a dimension type or undefined.
 * @param itemsCount
 * @param prefix - The CSS variable prefix used for generating styles.
 * @returns {CSSProperties} A CSSProperties object containing the calculated row styles.
 */
export const useDefaultResponsiveRowsStyle = (
  cols: DimensionType | undefined,
  rows: DimensionType | undefined,
  itemsCount: number,
  prefix: string,
): CSSProperties => {
  const style: DimensionCSSProperties = {};
  const cssPrefix: string = `--${prefix}`;

  if (typeof cols === 'object' && rows === MATRIX_ROWS_DEFAULT && itemsCount > 0) {
    Object.keys(cols).forEach((key) => {
      const breakpointSuffix = key === 'mobile' ? '' : `-${key}`;
      (style as Record<string, string | undefined>)[`${cssPrefix}-items-count`] = `${itemsCount}`;
      (style as Record<string, string | undefined>)[`${cssPrefix}-rows${breakpointSuffix}`] =
        `calc(var(${cssPrefix}-item-rows) * var(${cssPrefix}-items-count) / var(${cssPrefix}-columns${breakpointSuffix}))`;
    });
  }

  return style;
};

export function useMatrixStyleProps(
  props: SpiritMatrixProps<ElementType>,
): MatrixStyles<SpiritMatrixProps<ElementType>> {
  const { cols, itemsCount, itemRows, rows, spacing, spacingX, spacingY, ...restProps } = props;

  const matrixClass = useClassNamePrefix('Matrix');
  const matrixPrefix: string = `${cssVariablePrefix}matrix`;

  const matrixCustomStyle: CSSProperties = {
    ...useDimensionStyle(cols, `${matrixPrefix}-columns`),
    ...useDimensionStyle(rows, `${matrixPrefix}-rows`),
    ...useDimensionStyle(itemRows, `${matrixPrefix}-item-rows`),
    ...useDefaultResponsiveRowsStyle(cols, rows, itemsCount as number, matrixPrefix),
    ...useSpacingStyle(spacing, matrixPrefix, DirectionAxis.X),
    ...useSpacingStyle(spacing, matrixPrefix, DirectionAxis.Y),
    ...useSpacingStyle(spacingX, matrixPrefix, DirectionAxis.X),
    ...useSpacingStyle(spacingY, matrixPrefix, DirectionAxis.Y),
  };

  return {
    classProps: classNames(matrixClass),
    props: restProps,
    styleProps: matrixCustomStyle,
  };
}
