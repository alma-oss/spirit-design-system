'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritStackItemProps,
  type StackItemProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useStackStyleProps } from './useStackStyleProps';

const defaultProps = {
  elementType: 'div',
};

const _StackItem = <E extends ElementType = 'div'>(
  props: SpiritStackItemProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const { elementType = defaultProps.elementType, children, ...restProps } = props;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useStackStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.item,
    styleProps,
    otherProps,
  });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const StackItem = forwardRef(_StackItem) as unknown as PolymorphicComponent<'div', StackItemProps>;

StackItem.spiritComponent = 'StackItem';
StackItem.displayName = 'StackItem';

export default StackItem;
