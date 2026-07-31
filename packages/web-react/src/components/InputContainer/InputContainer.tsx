'use client';

import React, { type ElementType } from 'react';
import { FillVariants, Sizes } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type WithFormFieldContext } from '../../types';
import { filterDOMProps, mergeProps, mergeStyleProps } from '../../utils';
import { type SpiritInputContainerProps } from './types';
import { useInputContainerStyleProps } from './useInputContainerStyleProps';

const defaultProps: Partial<SpiritInputContainerProps> = {
  size: Sizes.MEDIUM,
  variant: FillVariants.FILL,
  elementType: 'div',
};

const InputContainer = <E extends ElementType = 'div'>(props: SpiritInputContainerProps<E>) => {
  const formFieldsProps = useContext(FormFieldsContext) ?? {};
  const mergedProps = useContextProps<WithFormFieldContext<SpiritInputContainerProps<E>>>(props, 'inputContainer');
  const propsWithDefaults = mergeProps(defaultProps, formFieldsProps, mergedProps);
  const { classProps, props: modifiedProps } = useInputContainerStyleProps(
    propsWithDefaults as SpiritInputContainerProps<E>,
  );
  const { children, elementType, ...restProps } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const Component = (elementType || defaultProps.elementType) as ElementType;
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...filterDOMProps(otherProps)} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

InputContainer.spiritComponent = 'InputContainer';
InputContainer.displayName = 'InputContainer';

export default InputContainer;
