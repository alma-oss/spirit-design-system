'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritFieldGroupProps } from '../../types';
import { HelperText, ValidationText, useAriaDescribedBy } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
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
    isFluid,
    isLabelHidden,
    isRequired,
    label,
    validationState,
    validationText,
    ...rest
  } = props;

  const { classProps } = useFieldGroupStyleProps({ hasValidationIcon, isFluid, isRequired, validationState });
  const { styleProps, props: transferProps } = useStyleProps(rest);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  return (
    <fieldset
      {...transferProps}
      {...styleProps}
      {...ariaDescribedByProp}
      className={classNames(classProps.root, styleProps.className)}
      disabled={isDisabled}
    >
      <VisuallyHidden elementType="legend">{label}</VisuallyHidden>
      {!isLabelHidden && (
        <div className={classProps.label} aria-hidden="true">
          {label}
        </div>
      )}
      <div className={classProps.fields}>{children}</div>
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
          id={`${id}__helperText`}
          validationText={validationText}
          registerAria={register}
          role={validationTextRole}
        />
      )}
    </fieldset>
  );
};

FieldGroup.spiritComponent = 'FieldGroup';

export default FieldGroup;
