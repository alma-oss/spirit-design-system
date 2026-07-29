'use client';

import React, { type ElementType, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import {
  type ControlButtonProps,
  type FormFieldContextValue,
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
  const mergedProps = useContextProps(props, 'controlButton') as Partial<
    Omit<FormFieldContextValue, 'elementType'> & SpiritControlButtonProps<E, S>
  >;
  const propsWithDefaults = { ...defaultProps, ...mergedProps };
  // isRequired/validationState are discarded here so they never leak onto the DOM as raw attributes
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    elementType = defaultProps.elementType,
    children,
    isRequired,
    validationState,
    ...restProps
  } = propsWithDefaults;
  /* eslint-enable @typescript-eslint/no-unused-vars */

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
    <Component {...otherProps} {...controlButtonProps} ref={ref} {...mergedStyleProps}>
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
