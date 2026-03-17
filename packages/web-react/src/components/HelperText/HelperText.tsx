'use client';

import React, { type ElementType, useEffect } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue, FormFieldVariants, type SpiritHelperTextProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHelperTextStyleProps } from './useHelperTextStyleProps';

const defaultProps: Partial<SpiritHelperTextProps> = {
  elementType: 'div',
  formFieldVariant: FormFieldVariants.BOX,
  id: undefined,
  isDisabled: false,
  registerAria: undefined,
};

<<<<<<< HEAD:packages/web-react/src/components/Field/HelperText.tsx
const HelperText = <E extends ElementType = 'div'>(props: HelperTextProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { helperText, elementType, id, registerAria, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { styleProps, transferProps });
=======
const HelperText = <E extends ElementType = 'div'>(props: SpiritHelperTextProps<E>) => {
  const contextProps = (useContextProps() ?? {}) as Partial<FormFieldContextValue>;
  const propsWithDefaults = {
    ...defaultProps,
    isDisabled: contextProps.isDisabled,
    formFieldVariant: contextProps.formFieldVariant,
    ...props,
  };
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
>>>>>>> 92c17dc32 (refactor(web-react): extract `HelperText` and move `useAriaIds` to shared hooks #DS-2398):packages/web-react/src/components/HelperText/HelperText.tsx

  useEffect(() => {
    helperText && registerAria?.({ add: id });

    return () => {
      registerAria?.({ remove: id });
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
