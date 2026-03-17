'use client';

import React, { type ElementType, useEffect } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue, type SpiritHelperTextProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHelperTextStyleProps } from './useHelperTextStyleProps';

const defaultProps: Partial<SpiritHelperTextProps> = {
  elementType: 'div',
  id: undefined,
  isDisabled: false,
  registerAria: undefined,
};

const HelperText = <E extends ElementType = 'div'>(props: SpiritHelperTextProps<E>) => {
  const contextProps = useContextProps<Partial<FormFieldContextValue>>();
  const propsWithDefaults = {
    ...defaultProps,
    isDisabled: contextProps.isDisabled,
    formFieldVariant: contextProps.formFieldVariant,
    ...props,
  };
  const {
    helperText,
    elementType: Component = defaultProps.elementType as ElementType,
    id,
    isDisabled,
    formFieldVariant,
    registerAria,
    ...restProps
  } = propsWithDefaults;

  const { classProps } = useHelperTextStyleProps({ isDisabled, formFieldVariant });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, transferProps });

  useEffect(() => {
    helperText && registerAria?.({ add: id });

    return () => {
      id && registerAria?.({ remove: id });
    };
  }, [helperText, id, registerAria]);

  if (helperText) {
    return (
      <Component {...transferProps} {...mergedStyleProps} id={id}>
        {helperText}
      </Component>
    );
  }

  return null;
};

HelperText.spiritComponent = 'HelperText';
HelperText.displayName = 'HelperText';

export default HelperText;
