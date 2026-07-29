'use client';

import React, { type ElementType, useEffect } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type SpiritValidationTextProps, type WithFormFieldContext } from '../../types';
import { filterDOMProps, mergeProps, mergeStyleProps } from '../../utils';
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
  const inlineElementsProps = useContext(InlineElementsContext) ?? {};
  const mergedProps = useContextProps<WithFormFieldContext<SpiritValidationTextProps<E>>>(props, 'validationText');
  const propsWithDefaults = mergeProps(defaultProps, inlineElementsProps, mergedProps);
  const {
    elementType: Component = defaultProps.elementType as ElementType,
    id,
    validationStateIcon,
    registerAria,
    role,
    validationText,
    isDisabled,
    isRequired,
    validationState,
    ...restProps
  } = propsWithDefaults;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const validationIconName = useValidationIcon({ validationStateIcon });
  const validationStateForStyles = validationStateIcon ?? mergedProps.validationState;
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
