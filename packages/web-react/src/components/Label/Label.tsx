'use client';

import React, { type ElementType } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue, type SpiritLabelProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useLabelStyleProps } from './useLabelStyleProps';

const defaultProps: Partial<SpiritLabelProps> = {
  elementType: 'label',
  hasPointerCursor: false,
  isDisabled: false,
  isLabelHidden: false,
  isRequired: false,
};

const Label = <E extends ElementType = 'label'>(props: SpiritLabelProps<E>): JSX.Element => {
  const contextProps = useContextProps<Partial<FormFieldContextValue>>();
  const propsWithDefaults = {
    ...defaultProps,
    elementType: contextProps.elementType,
    isDisabled: contextProps.isDisabled,
    isStretched: contextProps.isItem,
    isLabelHidden: contextProps.isLabelHidden,
    isRequired: contextProps.isRequired,
    ...props,
  };
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
    ...restProps
  } = propsWithDefaults;

  const { classProps } = useLabelStyleProps({
    hasPointerCursor,
    isDisabled,
    isStretched,
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
