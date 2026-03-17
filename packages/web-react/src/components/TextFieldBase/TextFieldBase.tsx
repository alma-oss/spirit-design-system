'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import {
  type ForwardRefComponent,
  type SpiritTextFieldBaseProps,
  type TextFieldBasePasswordToggleProps,
} from '../../types';
import { CharacterCounter } from '../CharacterCounter';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import TextFieldBaseInput from './TextFieldBaseInput';
import { useTextFieldBaseStyleProps } from './useTextFieldBaseStyleProps';
import withPasswordToggle from './withPasswordToggle';

const TextFieldBaseInputWithPasswordToggle = forwardRef(
  withPasswordToggle<TextFieldBasePasswordToggleProps>(TextFieldBaseInput),
);

const _TextFieldBase = (props: SpiritTextFieldBaseProps, ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>) => {
  const {
    'aria-describedby': ariaDescribedBy = '',
    counterProps,
    hasValidationIcon,
    helperText,
    id,
    isDisabled,
    isLabelHidden,
    isRequired,
    label,
    size = Sizes.MEDIUM,
    validationState,
    validationText,
    ...restProps
  } = props;
  const { classProps, props: modifiedProps } = useTextFieldBaseStyleProps({
    id,
    isDisabled,
    isRequired,
    size,
    validationState,
    ...restProps,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  const hasTextContent = helperText || (validationState && validationText);

  const helperTextElement = <HelperText id={`${id}__helper-text`} registerAria={register} helperText={helperText} />;

  const validationTextElement = validationState ? (
    <ValidationText
      elementType="span"
      {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
      id={`${id}__validation-text`}
      validationText={validationText}
      registerAria={register}
      role={validationTextRole}
    />
  ) : null;

  const counterElement = counterProps ? (
    <CharacterCounter {...counterProps} id={id} registerAria={register} UNSAFE_className={classProps.counter} />
  ) : null;

  return (
    <PropsProvider
      value={{
        isDisabled,
        isLabelHidden,
        isRequired,
        validationState,
      }}
    >
      <div {...styleProps} className={classNames(classProps.root, styleProps.className)}>
        <Label htmlFor={id}>{label}</Label>
        <TextFieldBaseInputWithPasswordToggle {...otherProps} {...ariaDescribedByProp} id={id} ref={ref} size={size} />
        {counterProps ? (
          <Flex direction="horizontal" isWrapping={false} alignmentX="space-between" alignmentY="top">
            {hasTextContent ? (
              <div>
                {/* In counter layout, put validation first so the status message stays visually closest to the counter row. */}
                {validationTextElement}
                {helperTextElement}
              </div>
            ) : null}
            {counterElement}
          </Flex>
        ) : (
          <>
            {/* Without counter, keep the default field text flow: helper first, then validation. */}
            {helperTextElement}
            {validationTextElement}
          </>
        )}
      </div>
    </PropsProvider>
  );
};

const TextFieldBase = forwardRef<HTMLInputElement | HTMLTextAreaElement, SpiritTextFieldBaseProps>(
  _TextFieldBase,
) as ForwardRefComponent<HTMLInputElement | HTMLTextAreaElement, SpiritTextFieldBaseProps>;

TextFieldBase.spiritComponent = 'TextFieldBase';
TextFieldBase.displayName = 'TextFieldBase';

export default TextFieldBase;
