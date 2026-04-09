'use client';

import classNames from 'classnames';
import React from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaIds, useStyleProps } from '../../hooks';
import { type SpiritFieldGroupProps } from '../../types';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { VisuallyHidden } from '../VisuallyHidden';
import { useFieldGroupStyleProps } from './useFieldGroupStyleProps';

const FieldGroup = (props: SpiritFieldGroupProps) => {
  const {
    'aria-describedby': ariaDescribedBy = '',
    children,
    helperText,
    hasValidationIcon,
    id,
    isDisabled,
    isLabelHidden,
    isRequired,
    label,
    validationState,
    validationText,
    ...rest
  } = props;

  const { classProps } = useFieldGroupStyleProps({ hasValidationIcon, isRequired, validationState });
  const { styleProps, props: transferProps } = useStyleProps(rest);
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
      <fieldset
        {...transferProps}
        {...styleProps}
        {...ariaDescribedByProp}
        className={classNames(classProps.root, styleProps.className)}
        disabled={isDisabled}
      >
        <VisuallyHidden elementType="legend">{label}</VisuallyHidden>
        {!isLabelHidden && (
          <Label elementType="div" aria-hidden="true">
            {label}
          </Label>
        )}
        <div className={classProps.fields}>{children}</div>
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
      </fieldset>
    </PropsProvider>
  );
};

FieldGroup.spiritComponent = 'FieldGroup';

export default FieldGroup;
