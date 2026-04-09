'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaIds, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritSelectProps } from '../../types';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { useSelectStyleProps } from './useSelectStyleProps';

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
  const { classProps } = useSelectStyleProps({
    hasValidationIcon,
    isDisabled,
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
    <PropsProvider
      value={{
        isDisabled,
        isLabelHidden,
        isRequired,
        validationState,
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
