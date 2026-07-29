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
  const mergedProps = useContextProps<
    Partial<Omit<FormFieldContextValue, 'elementType'> & SpiritInputContainerProps<E>>
  >(props, 'inputContainer');
  const propsWithDefaults = { ...defaultProps, ...mergedProps };
  // isRequired is discarded here so it never leaks onto the DOM as a raw attribute
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isRequired, ...ownProps } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useInputContainerStyleProps(ownProps as SpiritInputContainerProps<E>);
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
