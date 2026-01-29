'use client';

import React, { forwardRef, type ElementType } from 'react';
import { usePropsContext } from '../../context';
import { useStyleProps } from '../../hooks';
import { type ButtonProps, type PolymorphicRef, type SpiritButtonProps, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Spinner } from '../Spinner';
import { useButtonProps } from './useButtonProps';
import { useButtonStyleProps } from './useButtonStyleProps';

const defaultProps = {
  color: 'primary',
  /**
   * @deprecated "isBlock" property will be removed in the next major version. Please read component's README for more information.
   * @see https://jira.almacareer.tech/browse/DS-1897
   */
  isBlock: false,
  isDisabled: false,
  isLoading: false,
  isSymmetrical: false,
  size: 'medium',
  type: 'button',
  elementType: 'button' as const,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Button'] }] */
const _Button = <T extends ElementType = 'button', C = void, S = void>(
  props: ButtonProps<T, C, S>,
  ref: PolymorphicRef<T>,
) => {
  const propsWithContext = usePropsContext();
  const propsWithDefaults = { ...defaultProps, ...props, ...propsWithContext };
  const {
    elementType = defaultProps.elementType,
    children,
    ...restProps
  } = propsWithDefaults;

  const Component = elementType as React.ElementType;

  const { buttonProps } = useButtonProps(restProps);
  const { classProps, props: modifiedProps } = useButtonStyleProps(propsWithDefaults as SpiritButtonProps<T, C, S>);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...buttonProps} ref={ref} {...mergedStyleProps}>
      {children}
      {restProps.isLoading && <Spinner />}
    </Component>
  );
};

const Button = forwardRef(_Button) as unknown as (<T extends ElementType = 'button', C = void, S = void>(
  props: ButtonProps<T, C, S> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) & SpiritComponentStaticProps;

Button.spiritComponent = 'Button';
Button.displayName = 'Button';

export default Button;
