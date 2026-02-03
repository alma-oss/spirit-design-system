'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { type SpiritSelectProps } from '../../types';
import { HelperText, Label, ValidationText, useAriaIds } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { Icon } from '../Icon';
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
  const [ids, register] = useAriaIds(ariaDescribedBy);
  const ariaDescribedByProp = useAriaDescribedBy(ids);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  return (
    <div {...styleProps} className={classNames(classProps.root, styleProps.className)}>
      <Label htmlFor={id} UNSAFE_className={classProps.label}>
        {label}
      </Label>
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
  );
};

const Select = forwardRef<HTMLSelectElement, SpiritSelectProps>(_Select);

Select.spiritComponent = 'Select';

export default Select;
