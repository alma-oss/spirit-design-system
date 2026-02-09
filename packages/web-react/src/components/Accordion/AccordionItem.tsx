'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type AccordionItemProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritAccordionItemProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { AccordionItemProvider } from './AccordionItemContext';
import { useAccordionStyleProps } from './useAccordionStyleProps';

const _AccordionItem = <E extends ElementType = 'article'>(
  props: SpiritAccordionItemProps<E>,
  ref: PolymorphicRef<E>,
) => {
  const { children, elementType = 'article', id, ...restProps } = props;

  const Component = elementType as ElementType;

  const { classProps } = useAccordionStyleProps();
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.item, styleProps });

  const contextValue = { id };

  return (
    <Component {...transferProps} id={id} {...mergedStyleProps} ref={ref}>
      <AccordionItemProvider value={contextValue}>{children}</AccordionItemProvider>
    </Component>
  );
};

const AccordionItem = forwardRef(_AccordionItem) as unknown as PolymorphicComponent<'article', AccordionItemProps>;

AccordionItem.spiritComponent = 'AccordionItem';
AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
