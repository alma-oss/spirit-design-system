'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type AccordionItemProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { AccordionItemProvider } from './AccordionItemContext';
import { useAccordionStyleProps } from './useAccordionStyleProps';

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_AccordionItem'] }] */
const _AccordionItem = <T extends ElementType = 'article'>(
  props: AccordionItemProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const { children, elementType = 'article', id, ...restProps } = props;

  const Component = elementType as React.ElementType;

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

const AccordionItem = forwardRef(_AccordionItem) as unknown as (<T extends ElementType = 'article'>(
  props: AccordionItemProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

AccordionItem.spiritComponent = 'AccordionItem';
AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
