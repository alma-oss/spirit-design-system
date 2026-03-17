'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaDetails, useStyleProps } from '../../hooks';
import { FormFieldVariants, type ForwardRefComponent, type SpiritCheckboxProps } from '../../types';
import { HelperText } from '../HelperText';
import { InputDetails } from '../InputDetails';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
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
    isItem,
    isLabelHidden,
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
    <PropsProvider
      value={{
        formFieldVariant: isItem ? FormFieldVariants.ITEM : FormFieldVariants.INLINE,
        isDisabled,
        isLabelHidden,
        isRequired,
        validationState,
      }}
    >
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
          <Label htmlFor={id}>{label}</Label>
          {details && (
            <InputDetails id={`${id}-details`} registerAriaDetails={registerDetails}>
              {details}
            </InputDetails>
          )}
          <HelperText id={`${id}-helper-text`} registerAria={register} helperText={helperText} />
          {validationState && (
            <ValidationText
              id={`${id}-validation-text`}
              {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
              validationText={validationText}
              registerAria={register}
              role={validationTextRole}
            />
          )}
        </div>
      </div>
    </PropsProvider>
  );
};

const Checkbox = forwardRef<HTMLInputElement, SpiritCheckboxProps>(_Checkbox) as ForwardRefComponent<
  HTMLInputElement,
  SpiritCheckboxProps
>;

Checkbox.spiritComponent = 'Checkbox';
Checkbox.displayName = 'Checkbox';

export default Checkbox;
