'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type ButtonProps, type PolymorphicComponent, type PolymorphicRef, type SpiritButtonProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Spinner } from '../Spinner';
import { useButtonProps } from './useButtonProps';
import { useButtonStyleProps } from './useButtonStyleProps';

const defaultProps = {
  color: 'primary',
  elementType: 'button',
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
};

const _Button = <E extends ElementType = 'button', C = void, S = void>(
  props: SpiritButtonProps<E, C, S>,
  ref: PolymorphicRef<E>,
) => {
  const { children, ...restFromProps } = props;
  const contextProps = useContextProps<Partial<SpiritButtonProps<E, C, S>>>();
  const propsWithDefaults = {
    ...defaultProps,
    ...restFromProps,
    elementType: contextProps.elementType ?? restFromProps.elementType ?? defaultProps.elementType,
    color: contextProps.color ?? restFromProps.color ?? defaultProps.color,
    size: contextProps.size ?? restFromProps.size ?? defaultProps.size,
    isDisabled: contextProps.isDisabled ?? restFromProps.isDisabled ?? defaultProps.isDisabled,
    isLoading: contextProps.isLoading ?? restFromProps.isLoading ?? defaultProps.isLoading,
    type: contextProps.type ?? restFromProps.type ?? defaultProps.type,
  };

  const { buttonProps } = useButtonProps(propsWithDefaults);

  const { elementType, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps, styleProps: buttonStyleProps } = useButtonStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps,
    styleProps: { ...buttonStyleProps, ...styleProps },
    otherProps,
  });

  return (
    <Component {...otherProps} {...buttonProps} ref={ref} {...mergedStyleProps}>
      {children}
      {restProps.isLoading && <Spinner />}
    </Component>
  );
};

const Button = forwardRef<HTMLButtonElement, SpiritButtonProps<'button', void, void>>(
  _Button,
) as unknown as PolymorphicComponent<'button', ButtonProps<void, void>>;

Button.spiritComponent = 'Button';
Button.displayName = 'Button';

export default Button;
