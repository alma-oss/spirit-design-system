'use client';

import classNames from 'classnames';
import React, { type ChangeEvent, type ForwardedRef, forwardRef, useState } from 'react';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritToggleProps } from '../../types';
import { HelperText, Label, ValidationText, useAriaIds } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { InputDetails } from '../InputDetails';
import { useToggleStyleProps } from './useToggleStyleProps';

const _Toggle = (props: SpiritToggleProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { classProps, props: modifiedProps } = useToggleStyleProps(props);
  const {
    'aria-describedby': ariaDescribedBy = '',
    'aria-details': ariaDetailsAttr,
    details,
    hasValidationIcon,
    id,
    isDisabled,
    isChecked = false,
    isRequired,
    label,
    helperText,
    onChange = () => {},
    validationState,
    validationText,
    ...restProps
  } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const [ids, register] = useAriaIds(ariaDescribedBy);
  const [detailsId, registerDetails] = useAriaIds(ariaDetailsAttr, { format: 'string' });
  const ariaDescribedByProp = useAriaDescribedBy(ids);
  const ariaDetailsProp = detailsId ? { 'aria-details': detailsId } : {};
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
    <div style={styleProps.style} className={classNames(classProps.root, styleProps.className)}>
      <div className={classProps.text}>
        <Label UNSAFE_className={classProps.label} htmlFor={id}>
          {label}
        </Label>
        {details && (
          <InputDetails id={`${id}__details`} registerAriaDetails={registerDetails}>
            {details}
          </InputDetails>
        )}
        <HelperText
          UNSAFE_className={classProps.helperText}
          id={`${id}__helperText`}
          registerAria={register}
          helperText={helperText}
        />
        {validationState && (
          <ValidationText
            UNSAFE_className={classProps.validationText}
            {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
            id={`${id}__validationText`}
            validationText={validationText}
            registerAria={register}
            role={validationTextRole}
          />
        )}
      </div>
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
    </div>
  );
};

const Toggle = forwardRef<HTMLInputElement, SpiritToggleProps>(_Toggle) as ForwardRefComponent<
  HTMLInputElement,
  SpiritToggleProps
>;

Toggle.spiritComponent = 'Toggle';
Toggle.displayName = 'Toggle';

export default Toggle;
