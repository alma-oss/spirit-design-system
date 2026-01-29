'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritComponentStaticProps, type StackProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useStackStyleProps } from './useStackStyleProps';

const defaultProps = {
  elementType: 'div' as const,
  hasSpacing: false,
  hasEndDivider: false,
  hasIntermediateDividers: false,
  hasStartDivider: false,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Stack'] }] */
const _Stack = <T extends ElementType = 'div'>(
  props: StackProps<T>,
  ref: PolymorphicRef<T>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType = defaultProps.elementType,
    children,
    ...restProps
  } = propsWithDefaults;

  const Component = elementType as React.ElementType;

  const { classProps, props: modifiedProps, styleProps: stackStyle } = useStackStyleProps(propsWithDefaults);
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

const Stack = forwardRef(_Stack) as unknown as (<T extends ElementType = 'div'>(
  props: StackProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

Stack.spiritComponent = 'Stack';
Stack.displayName = 'Stack';

export default Stack;
