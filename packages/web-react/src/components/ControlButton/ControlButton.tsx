'use client';

import React, { forwardRef, type ElementType } from 'react';
import { Sizes } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type ControlButtonProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useControlButtonProps } from './useControlButtonProps';
import { useControlButtonStyleProps } from './useControlButtonStyleProps';

const defaultProps = {
  elementType: 'button' as const,
  isDisabled: false,
  isSubtle: false,
  isSymmetrical: false,
  size: Sizes.MEDIUM,
  type: 'button' as const,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_ControlButton'] }] */
const _ControlButton = <T extends ElementType = 'button', S = void>(
  props: ControlButtonProps<T, S>,
  ref: PolymorphicRef<T>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType = defaultProps.elementType,
    children,
    ...restProps
  } = propsWithDefaults;

  const Component = elementType as React.ElementType;

  const { controlButtonProps } = useControlButtonProps(propsWithDefaults);
  const { classProps, props: modifiedProps } = useControlButtonStyleProps(propsWithDefaults);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...controlButtonProps} ref={ref} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

const ControlButton = forwardRef(_ControlButton) as unknown as (<T extends ElementType = 'button', S = void>(
  props: ControlButtonProps<T, S> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

ControlButton.spiritComponent = 'ControlButton';
ControlButton.displayName = 'ControlButton';

export default ControlButton;
