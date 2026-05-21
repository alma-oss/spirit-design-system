'use client';

import React, { type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritSelectProps } from '../../types';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { InputAddon } from '../InputAddon';
import { InputContainer } from '../InputContainer';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';

const _Select = (props: SpiritSelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const {
    'aria-describedby': ariaDescribedBy = '',
    children,
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
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

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
      <div {...styleProps}>
        <Label htmlFor={id}>{label}</Label>
        <InputContainer>
          <select
            {...transferProps}
            {...ariaDescribedByProp}
            id={id}
            disabled={isDisabled}
            required={isRequired}
            ref={ref}
          >
            {children}
          </select>
          <InputAddon>
            <Icon name="chevron-down" boxSize={size === Sizes.SMALL ? 16 : 20} />
          </InputAddon>
        </InputContainer>
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
