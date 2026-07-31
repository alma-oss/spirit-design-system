'use client';

import React, { type ElementType } from 'react';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue, type SpiritLabelProps } from '../../types';
import { filterDOMProps, mergeStyleProps } from '../../utils';
import { useLabelStyleProps } from './useLabelStyleProps';

const defaultProps: Partial<SpiritLabelProps> = {
  elementType: 'label',
  hasPointerCursor: false,
  isDisabled: false,
  isLabelHidden: false,
  isRequired: false,
};

const Label = <E extends ElementType = 'label'>(props: SpiritLabelProps<E>): JSX.Element => {
  const mergedProps = useContextProps<Partial<Omit<FormFieldContextValue, 'elementType'> & SpiritLabelProps<E>>>(
    props,
    'label',
  );
  const propsWithDefaults = { ...defaultProps, ...mergedProps, isStretched: mergedProps.isItem };
  const {
    children,
    elementType: ElementTag = 'label' as ElementType,
    for: labelFor,
    hasPointerCursor,
    htmlFor,
    isDisabled,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- excluded from restProps so it isn't spread onto the DOM element
    isItem,
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
