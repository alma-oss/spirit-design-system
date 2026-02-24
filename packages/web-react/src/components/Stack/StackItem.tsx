'use client';

import React, { type ElementType, forwardRef } from 'react';
import { PropsProvider, useContextProps } from '../../context';
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
  const { elementType: propsElementType } = props;
  const contextProps = useContextProps(props);
  const { children, elementType: contextElementType, ...restProps } = contextProps;
  const elementType = propsElementType ?? contextElementType ?? defaultProps.elementType;

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
      <PropsProvider value={{ elementType: undefined }}>{children}</PropsProvider>
    </Component>
  );
};

const StackItem = forwardRef<HTMLDivElement, SpiritStackItemProps<'div'>>(
  _StackItem,
) as unknown as PolymorphicComponent<'div', StackItemProps>;

StackItem.spiritComponent = 'StackItem';
StackItem.displayName = 'StackItem';

export default StackItem;
