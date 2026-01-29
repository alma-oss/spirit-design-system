'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type AccordionProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { AccordionProvider } from './AccordionContext';
import { useAccordionStyleProps } from './useAccordionStyleProps';

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Accordion'] }] */
const _Accordion = <T extends ElementType = 'section'>(
  props: AccordionProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const { children, elementType = 'section', open, toggle, ...restProps } = props;

  const Component = elementType as React.ElementType;

  const { classProps } = useAccordionStyleProps();
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps });

  const contextValue = {
    open,
    toggle,
  };

  return (
    <Component {...transferProps} {...mergedStyleProps} ref={ref}>
      <AccordionProvider value={contextValue}>{children}</AccordionProvider>
    </Component>
  );
};

const Accordion = forwardRef(_Accordion) as unknown as (<T extends ElementType = 'section'>(
  props: AccordionProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

Accordion.spiritComponent = 'Accordion';
Accordion.displayName = 'Accordion';

export default Accordion;
