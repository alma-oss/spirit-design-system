'use client';

import React, { type ElementType, forwardRef } from 'react';
import { AlignmentXExtended, AlignmentYExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type GridBaseProps, type GridProps, type PolymorphicComponent, type PolymorphicRef } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useGridStyleProps } from './useGridStyleProps';

const defaultProps = {
  alignmentX: AlignmentXExtended.STRETCH,
  alignmentY: AlignmentYExtended.STRETCH,
  elementType: 'div',
};

const _Grid = <T extends ElementType = 'div'>(props: GridProps<T>, ref: PolymorphicRef<T>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };

  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps, styleProps: gridStyle } = useGridStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps, gridStyle });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const Grid = forwardRef(_Grid) as unknown as PolymorphicComponent<'div', GridBaseProps>;

Grid.spiritComponent = 'Grid';
Grid.displayName = 'Grid';

export default Grid;
