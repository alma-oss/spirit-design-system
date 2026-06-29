'use client';

import React, { type ChangeEvent, type ForwardedRef, forwardRef, useState } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaDetails, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritToggleProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { InputDetails } from '../InputDetails';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { useToggleStyleProps } from './useToggleStyleProps';

const _Toggle = (props: SpiritToggleProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { alignmentX, classProps, direction, props: modifiedProps } = useToggleStyleProps(props);
  const {
    'aria-describedby': ariaDescribedBy = '',
    'aria-details': ariaDetailsAttr,
    details,
    hasValidationIcon,
    id,
    isDisabled,
    isChecked = false,
    isLabelHidden,
    isRequired,
    label,
    helperText,
    onChange = () => {},
    validationState,
    validationText,
    ...restProps
  } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const [ariaDetailsProp, registerDetails] = useAriaDetails(ariaDetailsAttr);
  const [checked, setChecked] = useState(isChecked);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event);
  };

  return (
    <PropsProvider
      value={{
        isDisabled,
        isLabelHidden,
        isRequired,
        validationState,
      }}
    >
      <Flex
        alignmentX={alignmentX}
        direction={direction}
        isInline
        spacingX={isLabelHidden ? 'space-0' : 'space-500'}
        {...mergeStyleProps(Flex, { styleProps, UNSAFE_className: 'py-500' })}
      >
        <input
          {...otherProps}
          {...ariaDescribedByProp}
          {...ariaDetailsProp}
          type="checkbox"
          id={id}
          className={classProps.input}
          disabled={isDisabled}
          checked={checked}
          required={isRequired}
          onChange={handleOnChange}
          ref={ref}
        />
        <Stack spacing="space-400">
          <Label htmlFor={id} hasPointerCursor>
            {label}
          </Label>
          {details && (
            <InputDetails id={`${id}-details`} registerAriaDetails={registerDetails}>
              {details}
            </InputDetails>
          )}
          <HelperText id={`${id}-helper-text`} registerAria={register} helperText={helperText} />
          {validationState && (
            <ValidationText
              id={`${id}-validation-text`}
              {...(hasValidationIcon && { validationStateIcon: validationState })}
              validationText={validationText}
              registerAria={register}
              role={validationTextRole}
            />
          )}
        </Stack>
      </Flex>
    </PropsProvider>
  );
};

const Toggle = forwardRef<HTMLInputElement, SpiritToggleProps>(_Toggle) as ForwardRefComponent<
  HTMLInputElement,
  SpiritToggleProps
>;

Toggle.spiritComponent = 'Toggle';
Toggle.displayName = 'Toggle';

export default Toggle;
