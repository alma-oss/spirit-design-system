'use client';

import React, { forwardRef, type ElementType } from 'react';
import { AlignmentXExtended, AlignmentYExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type GridProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useGridStyleProps } from './useGridStyleProps';

const defaultProps = {
  alignmentX: AlignmentXExtended.STRETCH,
  alignmentY: AlignmentYExtended.STRETCH,
  elementType: 'div' as const,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Grid'] }] */
const _Grid = <T extends ElementType = 'div'>(
  props: GridProps<T>,
  ref: PolymorphicRef<T>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };

  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as React.ElementType;

  const { classProps, props: modifiedProps, styleProps: gridStyle } = useGridStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps, gridStyle });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const Grid = forwardRef(_Grid) as unknown as (<T extends ElementType = 'div'>(
  props: GridProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

Grid.spiritComponent = 'Grid';
Grid.displayName = 'Grid';

export default Grid;
