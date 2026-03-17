'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaIds, useStyleProps } from '../../hooks';
import { FormFieldVariants, type ForwardRefComponent, type SpiritCheckboxProps } from '../../types';
import { ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import { useCheckboxStyleProps } from './useCheckboxStyleProps';

const _Checkbox = (props: SpiritCheckboxProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { classProps, props: modifiedProps } = useCheckboxStyleProps(props);
  const {
    'aria-describedby': ariaDescribedBy = '',
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
  const [ids, register] = useAriaIds(ariaDescribedBy);
  const ariaDescribedByProp = useAriaDescribedBy(ids);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  return (
    <PropsProvider
      value={{
        formFieldVariant: FormFieldVariants.INLINE,
        isDisabled,
        isItem,
        isLabelHidden,
        isRequired,
      }}
    >
      <div style={styleProps.style} className={classNames(classProps.root, styleProps.className)}>
        <input
          {...otherProps}
          {...ariaDescribedByProp}
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
          <HelperText id={`${id}__helperText`} registerAria={register} helperText={helperText} />
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
