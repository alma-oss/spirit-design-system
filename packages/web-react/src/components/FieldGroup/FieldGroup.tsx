'use client';

import classNames from 'classnames';
import React from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { type SpiritFieldGroupProps } from '../../types';
import { Flex } from '../Flex';
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

  const { classProps } = useFieldGroupStyleProps();
  const { styleProps, props: transferProps } = useStyleProps(rest);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  return (
    <PropsProvider
      value={{
        isDisabled,
        isRequired,
        label: { isLabelHidden },
        validationText: { validationState },
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
        <Flex direction="vertical" alignmentX="left" spacingY="space-500">
          {children}
        </Flex>
        <HelperText id={`${id}-helper-text`} registerAria={register} helperText={helperText} />
        {validationState && (
          <ValidationText
            id={`${id}-validation-text`}
            {...(hasValidationIcon && { validationStateIcon: validationState })}
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
