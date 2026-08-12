'use client';

import React, { type ElementType, forwardRef, useContext } from 'react';
import { Sizes } from '../../constants';
import { FormFieldsContext, useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import {
  type ControlButtonProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritControlButtonProps,
  type WithFormFieldContext,
} from '../../types';
import { filterDOMProps, mergeProps, mergeStyleProps } from '../../utils';
import { useControlButtonProps } from './useControlButtonProps';
import { useControlButtonStyleProps } from './useControlButtonStyleProps';

const defaultProps = {
  elementType: 'button',
  isDisabled: false,
  isSubtle: false,
  isSymmetrical: false,
  size: Sizes.MEDIUM,
  type: 'button',
};

const _ControlButton = <E extends ElementType = 'button', S = void>(
  props: SpiritControlButtonProps<E, S>,
  ref: PolymorphicRef<E>,
) => {
  const formFieldsProps = useContext(FormFieldsContext) ?? {};
  const mergedProps = useContextProps(props, 'controlButton') as WithFormFieldContext<SpiritControlButtonProps<E, S>>;
  const propsWithDefaults = mergeProps(defaultProps, formFieldsProps, mergedProps);
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { controlButtonProps } = useControlButtonProps(restProps);
  const {
    classProps,
    props: modifiedProps,
    styleProps: controlButtonStyleProps,
  } = useControlButtonStyleProps(restProps as SpiritControlButtonProps<E, S>);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps,
    styleProps: { ...controlButtonStyleProps, ...styleProps },
    otherProps,
  });

  return (
    <Component {...filterDOMProps(otherProps)} {...controlButtonProps} ref={ref} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

const ControlButton = forwardRef<HTMLButtonElement, SpiritControlButtonProps<'button', void>>(
  _ControlButton,
) as unknown as PolymorphicComponent<'button', ControlButtonProps<void>>;

ControlButton.spiritComponent = 'ControlButton';
ControlButton.displayName = 'ControlButton';

export default ControlButton;
