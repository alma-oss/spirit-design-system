'use client';

import React, { type ElementType, useEffect } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type SpiritHelperTextProps, type WithFormFieldContext } from '../../types';
import { filterDOMProps, mergeProps, mergeStyleProps } from '../../utils';
import { useHelperTextStyleProps } from './useHelperTextStyleProps';

const defaultProps: Partial<SpiritHelperTextProps> = {
  elementType: 'div',
  id: undefined,
  isDisabled: false,
  registerAria: undefined,
};

const HelperText = <E extends ElementType = 'div'>(props: SpiritHelperTextProps<E>) => {
  const inlineElementsProps = useContext(InlineElementsContext) ?? {};
  const mergedProps = useContextProps<WithFormFieldContext<SpiritHelperTextProps<E>>>(props, 'helperText');
  const propsWithDefaults = mergeProps(defaultProps, inlineElementsProps, mergedProps);
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
