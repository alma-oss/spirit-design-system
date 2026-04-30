'use client';

import React, { type ElementType } from 'react';
import { Sizes } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue } from '../../types';
import { mergeStyleProps } from '../../utils';
import { type SpiritInputContainerProps } from './types';
import { useInputContainerStyleProps } from './useInputContainerStyleProps';

const defaultProps: Partial<SpiritInputContainerProps> = {
  size: Sizes.MEDIUM,
  elementType: 'div',
};

const InputContainer = <E extends ElementType = 'div'>(props: SpiritInputContainerProps<E>) => {
  const contextProps = useContextProps<Partial<FormFieldContextValue>>();
  const propsWithDefaults = {
    ...defaultProps,
    size: contextProps.size ?? defaultProps.size,
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
