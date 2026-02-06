'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useClassNamePrefix, useStyleProps } from '../../hooks';
import {
  type PolymorphicComponent,
  type PolymorphicRef,
  type StackItemProps,
  type SpiritStackItemProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';

const defaultProps = {
  elementType: 'div',
};

const _StackItem = <T extends ElementType = 'div'>(props: SpiritStackItemProps<T>, ref: PolymorphicRef<T>): JSX.Element => {
  const { elementType = defaultProps.elementType, children, ...restProps } = props;

  const Component = elementType as ElementType;

  const stackClass = useClassNamePrefix('Stack');
  const stackItemClass = `${stackClass}Item`;

  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: stackItemClass,
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
