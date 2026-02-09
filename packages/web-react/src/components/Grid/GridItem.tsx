'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type GridItemProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritGridItemProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useGridItemStyleProps } from './useGridItemStyleProps';

const defaultProps = {
  elementType: 'div',
};

const _GridItem = <E extends ElementType = 'div'>(
  props: SpiritGridItemProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const { elementType = defaultProps.elementType, children, ...restProps } = props;
  const Component = elementType as ElementType;

  const { classProps, styleProps: gridItemStyle, props: modifiedProps } = useGridItemStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps, gridItemStyle });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const GridItem = forwardRef(_GridItem) as unknown as PolymorphicComponent<'div', GridItemProps>;

GridItem.spiritComponent = 'GridItem';
GridItem.displayName = 'GridItem';

export default GridItem;
