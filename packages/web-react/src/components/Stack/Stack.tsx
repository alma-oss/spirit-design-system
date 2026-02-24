'use client';

import React, { type ElementType, forwardRef } from 'react';
import { PropsProvider } from '../../context';
import { useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef, type SpiritStackProps, type StackProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useStackStyleProps } from './useStackStyleProps';

const LIST_ELEMENT_TYPES = ['ul', 'ol'];

const defaultProps = {
  elementType: 'div',
  hasSpacing: false,
  hasEndDivider: false,
  hasIntermediateDividers: false,
  hasStartDivider: false,
};

const _Stack = <E extends ElementType = 'div'>(props: SpiritStackProps<E>, ref: PolymorphicRef<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps, styleProps: stackStyle } = useStackStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.root,
    stackStyle,
    styleProps,
    otherProps,
  });
  const itemElementType = LIST_ELEMENT_TYPES.includes(elementType as string) ? ('li' as const) : undefined;

  return (
    <PropsProvider value={{ elementType: itemElementType }}>
      <Component {...otherProps} {...mergedStyleProps} ref={ref}>
        {children}
      </Component>
    </PropsProvider>
  );
};

const Stack = forwardRef<HTMLDivElement, SpiritStackProps<'div'>>(_Stack) as unknown as PolymorphicComponent<
  'div',
  StackProps
>;

Stack.spiritComponent = 'Stack';
Stack.displayName = 'Stack';

export default Stack;
