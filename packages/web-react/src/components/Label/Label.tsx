'use client';

import React, { type ElementType } from 'react';
import { useContextProps } from '../../context';
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
};

const Label = <E extends ElementType = 'label'>(props: SpiritLabelProps<E>): JSX.Element => {
  const inlineElementsProps = useContext(InlineElementsContext) ?? {};
  const mergedProps = useContextProps<WithFormFieldContext<SpiritLabelProps<E>>>(props, 'label');
  const propsWithDefaults = mergeProps(defaultProps, inlineElementsProps, mergedProps);
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
    validationState,
    ...restProps
  } = propsWithDefaults;
  /* eslint-enable @typescript-eslint/no-unused-vars */

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
