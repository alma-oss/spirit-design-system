'use client';

import React, { type ElementType, useEffect } from 'react';
import { useStyleProps } from '../../hooks';
import { mergeStyleProps } from '../../utils';
import { type InputDetailsProps } from './types';
import { useInputDetailsStyleProps } from './useInputDetailsStyleProps';

const defaultProps: Partial<InputDetailsProps> = {
  elementType: 'div',
  id: undefined,
  registerAriaDetails: undefined,
};

const InputDetails = <E extends ElementType = 'div'>(props: InputDetailsProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { classProps, props: modifiedProps } = useInputDetailsStyleProps(propsWithDefaults);
  const {
    children,
    elementType: ElementTag = defaultProps.elementType as ElementType,
    id,
    registerAriaDetails,
    ...restProps
  } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.root, styleProps, otherProps });

  useEffect(() => {
    registerAriaDetails?.({ add: id });

    return () => {
      registerAriaDetails?.({ remove: id });
    };
  }, [id, registerAriaDetails]);

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} id={id}>
      {children}
    </ElementTag>
  );
};

InputDetails.spiritComponent = 'InputDetails';

export default InputDetails;
