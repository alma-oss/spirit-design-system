'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type AccordionProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritAccordionProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { AccordionProvider } from './AccordionContext';
import { useAccordionStyleProps } from './useAccordionStyleProps';

const _Accordion = <T extends ElementType = 'section'>(props: SpiritAccordionProps<T>, ref: PolymorphicRef<T>) => {
  const { children, elementType = 'section', open, toggle, ...restProps } = props;

  const Component = elementType as ElementType;

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

const Accordion = forwardRef(_Accordion) as unknown as PolymorphicComponent<'section', AccordionProps>;

Accordion.spiritComponent = 'Accordion';
Accordion.displayName = 'Accordion';

export default Accordion;
