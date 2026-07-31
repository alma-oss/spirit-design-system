'use client';

import React, { type ElementType, useEffect } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue, type SpiritHelperTextProps } from '../../types';
import { filterDOMProps, mergeStyleProps } from '../../utils';
import { useHelperTextStyleProps } from './useHelperTextStyleProps';

const defaultProps: Partial<SpiritHelperTextProps> = {
  elementType: 'div',
  id: undefined,
  isDisabled: false,
  registerAria: undefined,
};

const HelperText = <E extends ElementType = 'div'>(props: SpiritHelperTextProps<E>) => {
  const mergedProps = useContextProps<Partial<Omit<FormFieldContextValue, 'elementType'> & SpiritHelperTextProps<E>>>(
    props,
    'helperText',
  );
  const propsWithDefaults = { ...defaultProps, ...mergedProps };
  const {
    helperText,
    elementType: Component = defaultProps.elementType as ElementType,
    id,
    isDisabled,
    registerAria,
    ...restProps
  } = propsWithDefaults;

  const { classProps } = useHelperTextStyleProps({ isDisabled });
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
      <Component {...filterDOMProps(transferProps)} {...mergedStyleProps} id={id}>
        {helperText}
      </Component>
    );
  }

  return null;
};

HelperText.spiritComponent = 'HelperText';
HelperText.displayName = 'HelperText';

export default HelperText;
