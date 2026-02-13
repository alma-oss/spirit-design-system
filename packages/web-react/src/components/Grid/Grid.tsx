'use client';

import React, { type ElementType, forwardRef } from 'react';
import { AlignmentXExtended, AlignmentYExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type GridProps, type PolymorphicComponent, type PolymorphicRef, type SpiritGridProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useGridStyleProps } from './useGridStyleProps';

const defaultProps = {
  alignmentX: AlignmentXExtended.STRETCH,
  alignmentY: AlignmentYExtended.STRETCH,
  elementType: 'div',
};

const _Grid = <E extends ElementType = 'div'>(props: SpiritGridProps<E>, ref: PolymorphicRef<E>): JSX.Element => {
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

const Grid = forwardRef<HTMLDivElement, SpiritGridProps<'div'>>(_Grid) as unknown as PolymorphicComponent<
  'div',
  GridProps
>;

Grid.spiritComponent = 'Grid';
Grid.displayName = 'Grid';

export default Grid;
