'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { FormFieldVariants, type ForwardRefComponent, type SpiritSelectProps } from '../../types';
import { ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { useSelectStyleProps } from './useSelectStyleProps';

const _Select = (props: SpiritSelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const {
    'aria-describedby': ariaDescribedBy = '',
    children,
    hasValidationIcon,
    helperText,
    id,
    isDisabled,
    isFluid,
    isLabelHidden,
    isRequired,
    label,
    size = Sizes.MEDIUM,
    validationState,
    validationText,
    ...restProps
  } = props;
  const { classProps } = useSelectStyleProps({
    hasValidationIcon,
    isDisabled,
    isFluid,
    isLabelHidden,
    isRequired,
    size,
    validationState,
  });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  return (
    <PropsProvider
      value={{
        formFieldVariant: FormFieldVariants.BOX,
        isDisabled,
        isLabelHidden,
        isRequired,
      }}
    >
      <div {...styleProps} className={classNames(classProps.root, styleProps.className)}>
        <Label htmlFor={id}>{label}</Label>
        <div className={classProps.container}>
          <select
            {...transferProps}
            {...ariaDescribedByProp}
            id={id}
            className={classProps.input}
            disabled={isDisabled}
            required={isRequired}
            ref={ref}
          >
            {children}
          </select>
          <div className={classProps.icon}>
            <Icon name="chevron-down" boxSize={size === Sizes.SMALL ? 16 : 20} />
          </div>
        </div>
        <HelperText id={`${id}__helperText`} registerAria={register} helperText={helperText} />
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
    </PropsProvider>
  );
};

const Select = forwardRef<HTMLSelectElement, SpiritSelectProps>(_Select) as ForwardRefComponent<
  HTMLSelectElement,
  SpiritSelectProps
>;

Select.spiritComponent = 'Select';
Select.displayName = 'Select';

export default Select;
