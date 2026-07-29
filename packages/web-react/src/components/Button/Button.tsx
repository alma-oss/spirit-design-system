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
  const mergedProps = useContextProps<Partial<SpiritButtonProps<E, C, S>>>(props, 'button');
  const propsWithDefaults = { ...defaultProps, ...mergedProps };

  const { buttonProps } = useButtonProps(propsWithDefaults);

  // isRequired/validationState are discarded here so they never leak onto the DOM as raw attributes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, elementType, isRequired, validationState, ...restProps } = propsWithDefaults;

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
