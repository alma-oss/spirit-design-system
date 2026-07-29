'use client';

import React, { type ElementType, forwardRef } from 'react';
import { PropsProvider, useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import {
  type FormFieldContextValue,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritStackItemProps,
  type StackItemProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useStackStyleProps } from './useStackStyleProps';

const defaultProps = {
  elementType: 'div',
};

const _StackItem = <E extends ElementType = 'div'>(
  props: SpiritStackItemProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const mergedProps = useContextProps<Partial<Omit<FormFieldContextValue, 'elementType'> & SpiritStackItemProps<E>>>(
    props,
    'stackItem',
  );
  const propsWithDefaults = { ...defaultProps, ...mergedProps };
  // isDisabled/isRequired/validationState are discarded here so they never leak onto the DOM as raw attributes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, elementType, isDisabled, isRequired, validationState, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useStackStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.item,
    styleProps,
    otherProps,
  });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      <PropsProvider
        value={{
          stackItem: { elementType: null },
          label: { elementType: null },
          helperText: { elementType: null },
          validationText: { elementType: null },
        }}
      >
        {children}
      </PropsProvider>
    </Component>
  );
};

const StackItem = forwardRef<HTMLDivElement, SpiritStackItemProps<'div'>>(
  _StackItem,
) as unknown as PolymorphicComponent<'div', StackItemProps>;

StackItem.spiritComponent = 'StackItem';
StackItem.displayName = 'StackItem';

export default StackItem;
