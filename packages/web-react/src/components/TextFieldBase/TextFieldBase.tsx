'use client';

import React, { type ElementType, type ForwardedRef, type RefObject, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { ContextPropsProvider, FormFieldsContext, UniversalProvider } from '../../context';
import { useAriaDescribedBy, useI18n, useStyleProps } from '../../hooks';
import { resolveComponentStrings } from '../../translations';
import { type ForwardRefComponent, type SpiritTextFieldBaseProps, type TextFieldStrings } from '../../types';
import { mergeStyleProps } from '../../utils';
import { CharacterCounter } from '../CharacterCounter';
import { ControlButton } from '../ControlButton';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { InputAddon } from '../InputAddon';
import { InputContainer } from '../InputContainer';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { usePasswordToggle } from './usePasswordToggle';

const _TextFieldBase = (props: SpiritTextFieldBaseProps, ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>) => {
  const { strings, ...propsWithoutStrings } = props as SpiritTextFieldBaseProps & { strings?: TextFieldStrings };
  const {
    'aria-describedby': ariaDescribedBy = '',
    counterProps,
    endAddon,
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
    variant,
    startAddon,
    type,
    validationState,
    validationText,
    ...restProps
  } = propsWithoutStrings;
  const { t } = useI18n();
  const { hide: ariaLabelHide, show: ariaLabelShow } = resolveComponentStrings(
    {
      hide: { value: strings?.ariaLabel?.hide, key: 'textField.password.hide' },
      show: { value: strings?.ariaLabel?.show, key: 'textField.password.show' },
    },
    t,
  );
  const { isPasswordShown, passwordToggle } = usePasswordToggle();
  const hasPasswordToggleAddon = Boolean(hasPasswordToggle && !isMultiline);
  let inputType = type;

  if (hasPasswordToggleAddon) {
    inputType = isPasswordShown ? 'text' : 'password';
  }

  const { styleProps, props: inputProps } = useStyleProps(restProps);
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
      {...(hasValidationIcon && { validationStateIcon: validationState })}
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
        aria-label={isPasswordShown ? ariaLabelHide : ariaLabelShow}
        data-spirit-toggle="password"
        isDisabled={isDisabled}
        isSubtle
        isSymmetrical
        role="switch"
        size={size}
        onClick={passwordToggle}
      >
        <Icon name={`visibility-${isPasswordShown ? 'off' : 'on'}`} />
      </ControlButton>
    </InputAddon>
  ) : null;

  return (
    <ContextPropsProvider
      value={{
        isDisabled,
        isRequired,
        validationState,
        label: { isLabelHidden },
        inputContainer: { variant },
      }}
    >
      <UniversalProvider values={[[FormFieldsContext, { size }]]}>
        <Stack {...mergeStyleProps(Stack, { styleProps })} spacing="space-400">
          <Label htmlFor={id}>{label}</Label>
          <InputContainer>
            {startAddon}
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
            {endAddon}
            {passwordToggleElement}
          </InputContainer>
          {counterProps ? (
            <Flex isWrapping={false} alignmentX="space-between" alignmentY="top">
              {hasTextContent ? (
                <Stack spacing="space-400">
                  {/* In counter layout, put validation first so the status message stays visually closest to the counter row. */}
                  {validationTextElement}
                  {helperTextElement}
                </Stack>
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
        </Stack>
      </UniversalProvider>
    </ContextPropsProvider>
  );
};

const TextFieldBase = forwardRef<HTMLInputElement | HTMLTextAreaElement, SpiritTextFieldBaseProps>(
  _TextFieldBase,
) as ForwardRefComponent<HTMLInputElement | HTMLTextAreaElement, SpiritTextFieldBaseProps>;

TextFieldBase.spiritComponent = 'TextFieldBase';
TextFieldBase.displayName = 'TextFieldBase';

export default TextFieldBase;
