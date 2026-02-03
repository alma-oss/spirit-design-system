'use client';

import React, { type ElementType, type ForwardedRef, type RefObject, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritTextFieldBaseInputProps } from '../../types';
import { useTextFieldBaseInputStyleProps } from './useTextFieldBaseInputStyleProps';

const _TextFieldBaseInput = (
  props: SpiritTextFieldBaseInputProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { classProps, props: modifiedProps } = useTextFieldBaseInputStyleProps(props);
  const { id, isDisabled, isMultiline, isRequired, inputWidth, type, ...restProps } = modifiedProps;
  const { props: otherProps } = useStyleProps(restProps);

  const ElementType: ElementType = isMultiline ? 'textarea' : 'input';
  const inputType = isMultiline ? undefined : type;

  return (
    <ElementType
      {...otherProps}
      className={classProps.input}
      disabled={isDisabled}
      id={id}
      required={isRequired}
      size={inputWidth}
      type={inputType}
      ref={ref as RefObject<HTMLInputElement & HTMLTextAreaElement>}
    />
  );
};

const TextFieldBaseInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, SpiritTextFieldBaseInputProps>(
  _TextFieldBaseInput,
);

TextFieldBaseInput.spiritComponent = 'TextFieldBaseInput';

export default TextFieldBaseInput;
