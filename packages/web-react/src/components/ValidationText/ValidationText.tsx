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
    isDisabled: contextProps.isDisabled,
    ...props,
  };
  const {
    elementType: Component = defaultProps.elementType as ElementType,
    id,
    validationStateIcon,
    registerAria,
    role,
    validationText,
    isDisabled,
    ...restProps
  } = propsWithDefaults;

  const validationIconName = useValidationIcon({ validationStateIcon });
  const validationStateForStyles = validationStateIcon ?? contextProps.validationState;
  const { classProps } = useValidationTextStyleProps({
    validationStateIcon: validationStateForStyles,
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

  const nonArrayValidationText = validationStateIcon ? <div>{validationText}</div> : validationText;

  return (
    <Component {...transferProps} {...mergedStyleProps} id={id} role={role}>
      {validationStateIcon && <Icon name={validationIconName} boxSize={20} />}
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
