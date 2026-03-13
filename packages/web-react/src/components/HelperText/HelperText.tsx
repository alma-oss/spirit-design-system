'use client';

import React, { type ElementType, useEffect } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { FormFieldVariants, type SpiritHelperTextProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHelperTextStyleProps } from './useHelperTextStyleProps';

const defaultProps: Partial<SpiritHelperTextProps> = {
  elementType: 'div',
  formFieldVariant: FormFieldVariants.BOX,
  id: undefined,
  isDisabled: false,
  registerAria: undefined,
};

const HelperText = <E extends ElementType = 'div'>(props: SpiritHelperTextProps<E>) => {
  const contextProps = useContextProps();
  const propsWithDefaults = { ...defaultProps, ...contextProps, ...props };
  const {
    helperText,
    elementType: ElementTag = defaultProps.elementType as ElementType,
    id,
    isDisabled,
    formFieldVariant,
    registerAria,
    ...restProps
  } = propsWithDefaults;

  const { classProps } = useHelperTextStyleProps({ isDisabled, formFieldVariant });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, transferProps });

  useEffect(() => {
    helperText && registerAria?.({ add: id });

    return () => {
      registerAria?.({ remove: id });
    };
  }, [helperText, id, registerAria]);

  if (helperText) {
    return (
      <ElementTag {...transferProps} {...mergedStyleProps} id={id}>
        {helperText}
      </ElementTag>
    );
  }

  return null;
};

HelperText.spiritComponent = 'HelperText';

export default HelperText;
