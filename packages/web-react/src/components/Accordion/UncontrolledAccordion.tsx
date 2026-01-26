'use client';

import React, { type ElementType } from 'react';
import { type AccordionProps, type UncontrolledAccordionProps } from '../../types';
import Accordion from './Accordion';
import { useAccordion } from './useAccordion';

const UncontrolledAccordion = <T extends ElementType = 'section'>(props: UncontrolledAccordionProps<T>) => {
  const { defaultOpen, stayOpen, ...restProps } = props;

  const { open, toggle } = useAccordion({ defaultOpen, stayOpen });

  return <Accordion {...(restProps as AccordionProps<T>)} open={open} toggle={toggle} />;
};

UncontrolledAccordion.spiritComponent = 'UncontrolledAccordion';
UncontrolledAccordion.displayName = 'UncontrolledAccordion';

export default UncontrolledAccordion;
