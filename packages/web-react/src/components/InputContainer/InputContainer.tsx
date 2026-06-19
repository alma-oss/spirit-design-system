'use client';

import React, { type ElementType } from 'react';
import { FillVariants, Sizes } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue } from '../../types';
import { mergeStyleProps } from '../../utils';
import { type SpiritInputContainerProps } from './types';
import { useInputContainerStyleProps } from './useInputContainerStyleProps';

const defaultProps: Partial<SpiritInputContainerProps> = {
  size: Sizes.MEDIUM,
  variant: FillVariants.FILL,
  elementType: 'div',
};

const InputContainer = <E extends ElementType = 'div'>(props: SpiritInputContainerProps<E>) => {
  const contextProps = useContextProps<Partial<FormFieldContextValue>>({}, 'inputContainer');
  const propsWithDefaults = {
    ...defaultProps,
    size: contextProps.size ?? defaultProps.size,
    variant: contextProps.variant ?? defaultProps.variant,
    isDisabled: contextProps.isDisabled,
    validationState: contextProps.validationState,
    ...props,
  };
  const { classProps, props: modifiedProps } = useInputContainerStyleProps(propsWithDefaults);
  const { children, elementType, ...restProps } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const Component = (elementType || defaultProps.elementType) as ElementType;
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

InputContainer.spiritComponent = 'InputContainer';
InputContainer.displayName = 'InputContainer';

export default InputContainer;
