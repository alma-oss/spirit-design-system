'use client';

import React, { type ElementType, useEffect } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue, type InputDetailsProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useInputDetailsStyleProps } from './useInputDetailsStyleProps';

const defaultProps: Partial<InputDetailsProps> = {
  elementType: 'div',
  id: undefined,
  isDisabled: false,
  registerAriaDetails: undefined,
};

const InputDetails = <E extends ElementType = 'div'>(props: InputDetailsProps<E>) => {
  const contextProps = useContextProps<Partial<FormFieldContextValue>>();
  const propsWithDefaults = {
    ...defaultProps,
    isDisabled: contextProps.isDisabled,
    ...props,
  };
  const {
    children,
    elementType: ElementTag = defaultProps.elementType as ElementType,
    id,
    isDisabled,
    registerAriaDetails,
    ...restProps
  } = propsWithDefaults;

  const { classProps } = useInputDetailsStyleProps({ isDisabled });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, transferProps });

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
    <ElementTag {...transferProps} {...mergedStyleProps} id={id}>
      {children}
    </ElementTag>
  );
};

InputDetails.spiritComponent = 'InputDetails';

export default InputDetails;
