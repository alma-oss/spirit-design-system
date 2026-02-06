'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef, type SpiritStackProps, type StackProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useStackStyleProps } from './useStackStyleProps';

const defaultProps = {
  elementType: 'div',
  hasSpacing: false,
  hasEndDivider: false,
  hasIntermediateDividers: false,
  hasStartDivider: false,
};

const _Stack = <T extends ElementType = 'div'>(props: SpiritStackProps<T>, ref: PolymorphicRef<T>): JSX.Element => {
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

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const Stack = forwardRef(_Stack) as unknown as PolymorphicComponent<'div', StackProps>;

Stack.spiritComponent = 'Stack';
Stack.displayName = 'Stack';

export default Stack;
