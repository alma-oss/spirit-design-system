'use client';

import React, { type ElementType } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue, FormFieldVariants, type SpiritLabelProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useLabelStyleProps } from './useLabelStyleProps';

const defaultProps: Partial<SpiritLabelProps> = {
  elementType: 'label',
  formFieldVariant: FormFieldVariants.BOX,
  isDisabled: false,
  isRequired: false,
  isLabelHidden: false,
  isItem: false,
};

const Label = <E extends ElementType = 'label'>(props: SpiritLabelProps<E>): JSX.Element => {
  const contextProps = (useContextProps() ?? {}) as Partial<FormFieldContextValue>;
  const propsWithDefaults = {
    ...defaultProps,
    formFieldVariant: contextProps.formFieldVariant,
    isDisabled: contextProps.isDisabled,
    isRequired: contextProps.isRequired,
    isLabelHidden: contextProps.isLabelHidden,
    isItem: contextProps.isItem,
    ...props,
  };
  const {
    children,
    elementType: ElementTag = 'label' as ElementType,
    htmlFor,
    for: labelFor,
    isDisabled,
    formFieldVariant,
    isRequired,
    isLabelHidden,
    isItem,
    ...restProps
  } = propsWithDefaults;

  const { classProps } = useLabelStyleProps({
    formFieldVariant,
    isDisabled,
    isItem,
    isLabelHidden,
    isRequired,
  });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, transferProps });

  return (
    <ElementTag
      {...transferProps}
      {...mergedStyleProps}
      htmlFor={ElementTag === 'label' ? labelFor || htmlFor : undefined}
    >
      {children}
    </ElementTag>
  );
};

Label.spiritComponent = 'Label';

export default Label;
