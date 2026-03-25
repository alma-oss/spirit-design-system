'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { useAriaDescribedBy, useAriaDetails, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritCheckboxProps } from '../../types';
import { HelperText, Label, ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { InputDetails } from '../InputDetails';
import { useCheckboxStyleProps } from './useCheckboxStyleProps';

const _Checkbox = (props: SpiritCheckboxProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { classProps, props: modifiedProps } = useCheckboxStyleProps(props);
  const {
    'aria-describedby': ariaDescribedBy = '',
    'aria-details': ariaDetailsAttr,
    details,
    hasValidationIcon,
    helperText,
    id,
    isChecked,
    isDisabled,
    isRequired,
    label,
    validationState,
    validationText,
    value,
    ...restProps
  } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const [ariaDetailsProp, registerDetails] = useAriaDetails(ariaDetailsAttr);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  return (
    <div style={styleProps.style} className={classNames(classProps.root, styleProps.className)}>
      <input
        {...otherProps}
        {...ariaDescribedByProp}
        {...ariaDetailsProp}
        type="checkbox"
        id={id}
        className={classProps.input}
        disabled={isDisabled}
        required={isRequired}
        checked={isChecked}
        value={value}
        ref={ref}
      />
      <div className={classProps.text}>
        <Label UNSAFE_className={classProps.label} htmlFor={id}>
          {label}
        </Label>
        {details && (
          <InputDetails id={`${id}-details`} registerAriaDetails={registerDetails}>
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
            id={`${id}__validationText`}
            {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
            validationText={validationText}
            registerAria={register}
            role={validationTextRole}
          />
        )}
      </div>
    </div>
  );
};

const Checkbox = forwardRef<HTMLInputElement, SpiritCheckboxProps>(_Checkbox) as ForwardRefComponent<
  HTMLInputElement,
  SpiritCheckboxProps
>;

Checkbox.spiritComponent = 'Checkbox';
Checkbox.displayName = 'Checkbox';

export default Checkbox;
