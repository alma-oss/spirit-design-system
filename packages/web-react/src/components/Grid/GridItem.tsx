'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type GridItemProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useGridItemStyleProps } from './useGridItemStyleProps';

const defaultProps = {
  elementType: 'div' as const,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_GridItem'] }] */
const _GridItem = <T extends ElementType = 'div'>(
  props: GridItemProps<T>,
  ref: PolymorphicRef<T>,
): JSX.Element => {
  const { elementType = defaultProps.elementType, children, ...restProps } = props;
  const Component = elementType as React.ElementType;

  const { classProps, styleProps: gridItemStyle, props: modifiedProps } = useGridItemStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps, gridItemStyle });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const GridItem = forwardRef(_GridItem) as unknown as (<T extends ElementType = 'div'>(
  props: GridItemProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

GridItem.spiritComponent = 'GridItem';
GridItem.displayName = 'GridItem';

export default GridItem;
