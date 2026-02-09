'use client';

import React, { type ElementType } from 'react';
import { type SpiritAccordionProps, type SpiritUncontrolledAccordionProps } from '../../types';
import Accordion from './Accordion';
import { useAccordion } from './useAccordion';

const UncontrolledAccordion = <E extends ElementType = 'section'>(props: SpiritUncontrolledAccordionProps<E>) => {
  const { defaultOpen, stayOpen, ...restProps } = props;

  const { open, toggle } = useAccordion({ defaultOpen, stayOpen });

  return <Accordion {...(restProps as SpiritAccordionProps<E>)} open={open} toggle={toggle} />;
};

UncontrolledAccordion.spiritComponent = 'UncontrolledAccordion';
UncontrolledAccordion.displayName = 'UncontrolledAccordion';

export default UncontrolledAccordion;
