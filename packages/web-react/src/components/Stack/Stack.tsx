'use client';

import React, { type ElementType, forwardRef } from 'react';
import { InlineElementsContext, ListItemsContext, UniversalProvider } from '../../context';
import { useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef, type SpiritStackProps, type StackProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useStackStyleProps } from './useStackStyleProps';

const LIST_ELEMENT_TYPES = ['ul', 'ol'];

const defaultProps = {
  elementType: 'div',
  hasSpacing: false,
  hasEndDivider: false,
  hasIntermediateDividers: false,
  hasStartDivider: false,
};

const _Stack = <E extends ElementType = 'div'>(props: SpiritStackProps<E>, ref: PolymorphicRef<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps, styleProps: stackStyle } = useStackStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.root,
    stackStyle,
    styleProps,
    otherProps,
  });
  // Provided even when empty: a Stack nested inside an Item must reset any inherited
  // elementType override (e.g. Item's InlineElementsContext 'span') for its own children,
  // instead of letting it leak through unmodified. A Context.Provider always fully replaces
  // the ancestor's value, so providing {} here is enough to reset it.
  const itemElementTypeValue = LIST_ELEMENT_TYPES.includes(elementType as string) ? { elementType: 'li' as const } : {};

  return (
    <UniversalProvider
      values={[
        [ListItemsContext, itemElementTypeValue],
        [InlineElementsContext, itemElementTypeValue],
      ]}
    >
      <Component {...otherProps} {...mergedStyleProps} ref={ref}>
        {children}
      </Component>
    </UniversalProvider>
  );
};

const Stack = forwardRef<HTMLDivElement, SpiritStackProps<'div'>>(_Stack) as unknown as PolymorphicComponent<
  'div',
  StackProps
>;

Stack.spiritComponent = 'Stack';
Stack.displayName = 'Stack';

export default Stack;
