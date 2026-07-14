'use client';

import React, { type ElementType, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import {
  type ControlButtonProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritControlButtonProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
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
  const contextProps = useContextProps<Partial<Pick<ControlButtonProps<S>, 'isDisabled' | 'size'>>>();
  const propsWithDefaults = {
    ...defaultProps,
    size: contextProps.size ?? defaultProps.size,
    isDisabled: contextProps.isDisabled ?? defaultProps.isDisabled,
    ...props,
  };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;
  const isButtonElement = elementType === 'button';
  const { type, ...restPropsWithoutType } = restProps;
  const componentProps = isButtonElement ? { ...restPropsWithoutType, type } : restPropsWithoutType;

  const { controlButtonProps } = useControlButtonProps(componentProps);
  const elementControlButtonProps = isButtonElement ? controlButtonProps : {};
  const {
    classProps,
    props: modifiedProps,
    styleProps: controlButtonStyleProps,
  } = useControlButtonStyleProps(componentProps as SpiritControlButtonProps<E, S>);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps,
    styleProps: { ...controlButtonStyleProps, ...styleProps },
    otherProps,
  });

  return (
    <Component {...otherProps} {...elementControlButtonProps} ref={ref} {...mergedStyleProps}>
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
