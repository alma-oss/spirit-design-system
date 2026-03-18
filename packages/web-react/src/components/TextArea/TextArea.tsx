'use client';

import React, { type ForwardedRef, type RefObject, forwardRef, useEffect, useRef } from 'react';
import { warning } from '../../common/utilities';
import { type ForwardRefComponent, type SpiritTextAreaProps } from '../../types';
import { normalizeStringValue } from '../../utils';
import { useCharacterCounterState } from '../CharacterCounter';
import { TextFieldBase } from '../TextFieldBase';
import { TEXTAREA_MAX_SAFE_LENGTH } from './constants';
import { useAdjustHeight } from './useAdjustHeight';

const isCounterActive = (hasCounter: boolean | undefined, counterThreshold: number | undefined): boolean =>
  hasCounter === true || counterThreshold !== undefined;

const resolveCounterNativeMaxLength = (consumerMaxLength: number | undefined): number =>
  consumerMaxLength === undefined ? TEXTAREA_MAX_SAFE_LENGTH : consumerMaxLength;

const _TextArea = (props: SpiritTextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  const {
    onInput,
    isAutoResizing,
    autoResizingMaxHeight = 400,
    counterThreshold,
    hasCounter,
    onChange,
    value,
    defaultValue,
    helperText,
    isDisabled,
    id,
    ...restProps
  } = props;

  const elementReference = useRef(ref);
  const { adjustHeightOnAutoresize, onInput: onInputHandler } = useAdjustHeight({
    elementReference,
    onInput,
    isAutoResizing,
    maxHeight: autoResizingMaxHeight,
  });

  const normalizedValue = normalizeStringValue(value);
  const normalizedDefaultValue = normalizeStringValue(defaultValue);

  const { counterProps, handleChange } = useCharacterCounterState({
    value: normalizedValue,
    defaultValue: normalizedDefaultValue,
    counterThreshold,
    hasCounter,
    onChange,
  });

  const counterOn = isCounterActive(hasCounter, counterThreshold);
  const nativeMaxLength = counterOn ? resolveCounterNativeMaxLength(restProps.maxLength) : undefined;
  const changeHandler = counterOn ? handleChange : onChange;

  const didWarnMaxLengthLowerThanThresholdRef = useRef(false);
  useEffect(() => {
    if (
      counterThreshold !== undefined &&
      restProps.maxLength !== undefined &&
      restProps.maxLength < counterThreshold &&
      !didWarnMaxLengthLowerThanThresholdRef.current
    ) {
      didWarnMaxLengthLowerThanThresholdRef.current = true;
      warning(
        false,
        'TextArea: `maxLength` should be greater than or equal to `counterThreshold` to keep visible counter and hard input limit aligned.',
      );
    }
  }, [counterThreshold, restProps.maxLength]);

  return (
    <TextFieldBase
      id={id}
      isMultiline
      ref={elementReference as RefObject<HTMLTextAreaElement>}
      onInput={onInputHandler}
      onFocus={adjustHeightOnAutoresize}
      onChange={changeHandler}
      value={value}
      defaultValue={defaultValue}
      helperText={helperText}
      isDisabled={isDisabled}
      counterProps={counterProps}
      {...restProps}
      {...(nativeMaxLength !== undefined && { maxLength: nativeMaxLength })}
    />
  );
};

const TextArea = forwardRef<HTMLTextAreaElement, SpiritTextAreaProps>(_TextArea) as ForwardRefComponent<
  HTMLTextAreaElement,
  SpiritTextAreaProps
>;

TextArea.spiritComponent = 'TextArea';
TextArea.displayName = 'TextArea';

export default TextArea;
