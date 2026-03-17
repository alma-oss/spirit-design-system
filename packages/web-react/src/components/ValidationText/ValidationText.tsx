'use client';

import React, { type ElementType, useEffect } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue, type SpiritValidationTextProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Icon } from '../Icon';
import { useValidationIcon } from './useValidationIcon';
import { useValidationTextStyleProps } from './useValidationTextStyleProps';

const defaultProps: Partial<SpiritValidationTextProps> = {
  elementType: 'div',
  id: undefined,
  registerAria: undefined,
  role: undefined,
};

const ValidationText = <E extends ElementType = 'div'>(props: SpiritValidationTextProps<E>) => {
  const contextProps = useContextProps<Partial<FormFieldContextValue>>();
  const propsWithDefaults = {
    ...defaultProps,
    formFieldVariant: contextProps.formFieldVariant,
    isDisabled: contextProps.isDisabled,
    ...props,
  };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    id,
    hasValidationStateIcon,
    registerAria,
    role,
    validationText,
    formFieldVariant,
    isDisabled,
    ...restProps
  } = propsWithDefaults;

  const validationIconName = useValidationIcon({ hasValidationStateIcon });
  const validationStateForStyles = hasValidationStateIcon ?? contextProps.validationState;
  const { classProps } = useValidationTextStyleProps({
    formFieldVariant,
    hasValidationStateIcon: validationStateForStyles,
    isDisabled,
  });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, {
    classProps,
    styleProps,
    transferProps,
  });

  useEffect(() => {
    validationText && registerAria?.({ add: id });

    return () => {
      id && registerAria?.({ remove: id });
    };
  }, [id, registerAria, validationText]);

  if (!validationText) {
    return null;
  }

  const nonArrayValidationText = hasValidationStateIcon ? <div>{validationText}</div> : validationText;

  return (
    <ElementTag {...transferProps} {...mergedStyleProps} id={id} role={role}>
      {hasValidationStateIcon && <Icon name={validationIconName} boxSize={20} />}
      {Array.isArray(validationText) ? (
        <ul>
          {validationText.map((item) => (
            <li key={`validationText_${item}`}>{item}</li>
          ))}
        </ul>
      ) : (
        nonArrayValidationText
      )}
    </ElementTag>
  );
};

ValidationText.spiritComponent = 'ValidationText';

export default ValidationText;
