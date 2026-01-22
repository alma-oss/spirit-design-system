'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type SpiritControlButtonProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useControlButtonProps } from './useControlButtonProps';
import { useControlButtonStyleProps } from './useControlButtonStyleProps';

const defaultProps: Partial<SpiritControlButtonProps> = {
  elementType: 'button',
  isDisabled: false,
  isSubtle: false,
  isSymmetrical: false,
  size: Sizes.MEDIUM,
  type: 'button',
};

const _ControlButton = <T extends ElementType = 'button', S = void>(
  props: SpiritControlButtonProps<T, S>,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    children,
    ...restProps
  } = propsWithDefaults;

  const { controlButtonProps } = useControlButtonProps(restProps);
  const {
    classProps,
    props: modifiedProps,
    styleProps: controlButtonStyleProps,
  } = useControlButtonStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, {
    classProps,
    styleProps: { ...controlButtonStyleProps, ...styleProps },
    otherProps,
  });

  return (
    <ElementTag {...otherProps} {...controlButtonProps} ref={ref} {...mergedStyleProps}>
      {children}
    </ElementTag>
  );
};

const ControlButton = forwardRef<HTMLButtonElement, SpiritControlButtonProps<ElementType>>(_ControlButton);

ControlButton.spiritComponent = 'ControlButton';

export default ControlButton;
