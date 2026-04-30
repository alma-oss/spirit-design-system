'use client';

import React, { type ElementType, type ForwardedRef, type RefObject, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useI18n, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritTextFieldBaseProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { CharacterCounter } from '../CharacterCounter';
import { ControlButton } from '../ControlButton';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { InputAddon } from '../InputAddon';
import { InputContainer } from '../InputContainer';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { usePasswordToggle } from './usePasswordToggle';

const _TextFieldBase = (props: SpiritTextFieldBaseProps, ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>) => {
  const {
    'aria-describedby': ariaDescribedBy = '',
    counterProps,
    hasPasswordToggle,
    hasValidationIcon,
    helperText,
    id,
    inputWidth,
    isDisabled,
    isLabelHidden,
    isMultiline,
    isRequired,
    label,
    size = Sizes.MEDIUM,
    type,
    validationState,
    validationText,
    ...restProps
  } = props;
  const { t } = useI18n();
  const { isPasswordShown, passwordToggle } = usePasswordToggle();
  const hasPasswordToggleAddon = Boolean(hasPasswordToggle && !isMultiline);
  let inputType = type;

  if (hasPasswordToggleAddon) {
    inputType = isPasswordShown ? 'text' : 'password';
  }

  const { styleProps, props: inputProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps('div', { styleProps });
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  const hasTextContent = helperText || (validationState && validationText);
  const Component: ElementType = isMultiline ? 'textarea' : 'input';
  const nativeInputType = isMultiline ? undefined : inputType;

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

  const counterElement = counterProps ? <CharacterCounter {...counterProps} id={id} registerAria={register} /> : null;

  const passwordToggleElement = hasPasswordToggleAddon ? (
    <InputAddon>
      <ControlButton
        aria-checked={isPasswordShown}
        aria-label={isPasswordShown ? t('textField.password.hide') : t('textField.password.show')}
        data-spirit-toggle="password"
        isDisabled={isDisabled}
        isSubtle
        isSymmetrical
        role="switch"
        size={size}
        onClick={passwordToggle}
        {...(isDisabled && { UNSAFE_className: 'color-scheme-on-disabled' })}
      >
        <Icon name={`visibility-${isPasswordShown ? 'off' : 'on'}`} boxSize={size === Sizes.SMALL ? 16 : 20} />
      </ControlButton>
    </InputAddon>
  ) : null;

  return (
    <PropsProvider
      value={{
        isDisabled,
        isLabelHidden,
        isRequired,
        size,
        validationState,
      }}
    >
      <div {...mergedStyleProps}>
        <Label htmlFor={id}>{label}</Label>
        <InputContainer>
          <Component
            {...inputProps}
            {...ariaDescribedByProp}
            disabled={isDisabled}
            id={id}
            required={isRequired}
            size={inputWidth}
            type={nativeInputType}
            ref={ref as RefObject<HTMLInputElement & HTMLTextAreaElement>}
          />
          {passwordToggleElement}
        </InputContainer>
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
