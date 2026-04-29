'use client';

import React, { Children, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritMatrixProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import {
  MATRIX_COLS_DEFAULT,
  MATRIX_ITEM_ROWS_DEFAULT,
  MATRIX_ROWS_DEFAULT,
  MATRIX_SPACING_X_DEFAULT,
  MATRIX_SPACING_Y_DEFAULT,
} from './constants';
import { useMatrixStyleProps } from './useMatrixStyleProps';

const defaultProps: Partial<SpiritMatrixProps> = {
  cols: MATRIX_COLS_DEFAULT,
  elementType: 'div',
  itemRows: MATRIX_ITEM_ROWS_DEFAULT,
  rows: MATRIX_ROWS_DEFAULT,
  spacingX: MATRIX_SPACING_X_DEFAULT,
  spacingY: MATRIX_SPACING_Y_DEFAULT,
};

const Matrix = <E extends ElementType = 'div'>(props: SpiritMatrixProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };

  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const itemsCount: number = Children.count(children);
  const {
    classProps,
    props: modifiedProps,
    styleProps: matrixStyleProps,
  } = useMatrixStyleProps({
    ...restProps,
    itemsCount,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps, matrixStyleProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

Matrix.spiritComponent = 'Matrix';
Matrix.displayName = 'Matrix';

export default Matrix;
