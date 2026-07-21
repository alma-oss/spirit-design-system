'use client';

import React, { type ElementType, useContext } from 'react';
import { SizesExtended } from '../../constants';
import { FormFieldsContext, InlineElementsContext, useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type SpiritLabelProps, type WithFormFieldContext } from '../../types';
import { filterDOMProps, mergeProps, mergeStyleProps } from '../../utils';
import { useLabelStyleProps } from './useLabelStyleProps';

const defaultProps: Partial<SpiritLabelProps> = {
  elementType: 'label',
  hasPointerCursor: false,
  isDisabled: false,
  isLabelHidden: false,
  isRequired: false,
  size: SizesExtended.MEDIUM,
};

const Label = <E extends ElementType = 'label'>(props: SpiritLabelProps<E>): JSX.Element => {
  const inlineElementsProps = useContext(InlineElementsContext) ?? {};
  const formFieldsProps = useContext(FormFieldsContext) ?? {};
  const mergedProps = useContextProps(props, 'label') as WithFormFieldContext<SpiritLabelProps<E>>;
  const propsWithDefaults = mergeProps(defaultProps, mergeProps(inlineElementsProps, formFieldsProps), mergedProps);
  const {
    children,
    elementType: ElementTag = 'label' as ElementType,
    for: labelFor,
    hasPointerCursor,
    htmlFor,
    isDisabled,
    isStretched,
    isLabelHidden,
    isRequired,
    size,
    ...restProps
  } = propsWithDefaults;

  const { classProps } = useLabelStyleProps({
    hasPointerCursor,
    isDisabled,
    isStretched,
    isLabelHidden,
    isRequired,
    size,
  });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, transferProps });

  return (
    <ElementTag
      {...filterDOMProps(transferProps)}
      {...mergedStyleProps}
      htmlFor={ElementTag === 'label' ? labelFor || htmlFor : undefined}
    >
      {children}
    </ElementTag>
  );
};

Label.spiritComponent = 'Label';

export default Label;
