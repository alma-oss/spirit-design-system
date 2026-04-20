'use client';

import React, { type ElementType, useEffect } from 'react';
import { useStyleProps } from '../../hooks';
import { type InputDetailsProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useInputDetailsStyleProps } from './useInputDetailsStyleProps';

const defaultProps: Partial<InputDetailsProps> = {
  elementType: 'div',
  id: undefined,
  registerAriaDetails: undefined,
};

const InputDetails = <E extends ElementType = 'div'>(props: InputDetailsProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { classProps, props: modifiedProps } = useInputDetailsStyleProps(propsWithDefaults);
  const { children, elementType, id, registerAriaDetails, ...restProps } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const Component = (elementType || defaultProps.elementType) as ElementType;
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  useEffect(() => {
    if (id) {
      registerAriaDetails?.({ add: id });
    }

    return () => {
      if (id) {
        registerAriaDetails?.({ remove: id });
      }
    };
  }, [id, registerAriaDetails]);

  return (
    <Component {...otherProps} {...mergedStyleProps} id={id}>
      {children}
    </Component>
  );
};

InputDetails.spiritComponent = 'InputDetails';
InputDetails.displayName = 'InputDetails';

export default InputDetails;
