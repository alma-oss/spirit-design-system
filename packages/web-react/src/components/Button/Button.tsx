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
  elementType: 'button',
};

const _Button = <E extends ElementType = 'button', C = void, S = void>(
  props: SpiritButtonProps<E, C, S>,
  ref: PolymorphicRef<E>,
) => {
  const { elementType: propsElementType } = props;
  const contextProps = useContextProps(props);
  const { elementType: contextElementType, children, ...restFromContext } = contextProps;
  const elementType = (propsElementType ?? contextElementType ?? defaultProps.elementType) as ElementType;
  const propsWithDefaults = { ...defaultProps, ...restFromContext };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `elementType` must be omitted from `restProps`: the root tag is chosen by the polymorphic `elementType` resolved above (explicit prop, then Stack context, then default). The duplicate key from `defaultProps` inside `propsWithDefaults` is only peeled off so it is not passed to hooks or the DOM.
  const { elementType: _elementType, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;

  const { buttonProps } = useButtonProps(restProps);
  const {
    classProps,
    props: modifiedProps,
    styleProps: buttonStyleProps,
  } = useButtonStyleProps(restProps as SpiritButtonProps<E, C, S>);
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
