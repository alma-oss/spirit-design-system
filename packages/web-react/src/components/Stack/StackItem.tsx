'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useClassNamePrefix, useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritComponentStaticProps, type StackItemProps } from '../../types';
import { mergeStyleProps } from '../../utils';

const defaultProps = {
  elementType: 'div' as const,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_StackItem'] }] */
const _StackItem = <T extends ElementType = 'div'>(
  props: StackItemProps<T>,
  ref: PolymorphicRef<T>,
): JSX.Element => {
  const { elementType = defaultProps.elementType, children, ...restProps } = props;

  const Component = elementType as React.ElementType;

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

const StackItem = forwardRef(_StackItem) as unknown as (<T extends ElementType = 'div'>(
  props: StackItemProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

StackItem.spiritComponent = 'StackItem';
StackItem.displayName = 'StackItem';

export default StackItem;
