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
    formFieldType: contextProps.formFieldType,
    isDisabled: contextProps.isDisabled,
    ...props,
  };
  const {
    elementType: Component = defaultProps.elementType as ElementType,
    id,
    hasValidationStateIcon,
    registerAria,
    role,
    validationText,
    formFieldType,
    isDisabled,
    ...restProps
  } = propsWithDefaults;

  const validationIconName = useValidationIcon({ hasValidationStateIcon });
  const validationStateForStyles = hasValidationStateIcon ?? contextProps.validationState;
  const { classProps } = useValidationTextStyleProps({
    formFieldType,
    hasValidationStateIcon: validationStateForStyles,
    isDisabled,
  });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, {
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
    <Component {...transferProps} {...mergedStyleProps} id={id} role={role}>
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
    </Component>
  );
};

ValidationText.spiritComponent = 'ValidationText';
ValidationText.displayName = 'ValidationText';

export default ValidationText;
