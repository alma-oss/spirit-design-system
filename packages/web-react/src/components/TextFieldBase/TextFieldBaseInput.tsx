'use client';

import React, { type ElementType, type ForwardedRef, type RefObject, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritTextFieldBaseInputProps } from '../../types';
import { useTextFieldBaseInputStyleProps } from './useTextFieldBaseInputStyleProps';

const _TextFieldBaseInput = (
  props: SpiritTextFieldBaseInputProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { classProps, props: modifiedProps } = useTextFieldBaseInputStyleProps(props);
  const { id, isDisabled, isMultiline, isRequired, inputWidth, type, ...restProps } = modifiedProps;
  const { props: otherProps } = useStyleProps(restProps);

  const Component: ElementType = isMultiline ? 'textarea' : 'input';
  const inputType = isMultiline ? undefined : type;

  return (
    <Component
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
) as unknown as ForwardRefComponent<HTMLInputElement | HTMLTextAreaElement, SpiritTextFieldBaseInputProps>;

TextFieldBaseInput.spiritComponent = 'TextFieldBaseInput';
TextFieldBaseInput.displayName = 'TextFieldBaseInput';

export default TextFieldBaseInput;
