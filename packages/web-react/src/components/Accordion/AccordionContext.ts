'use client';

import { createContext, useContext } from 'react';
import { type AccordionState } from '../../types';

const defaultContext: AccordionState = {
  open: undefined,
  toggle: () => null,
};

const AccordionContext = createContext<AccordionState>(defaultContext);
const AccordionProvider = AccordionContext.Provider;
const AccordionConsumer = AccordionContext.Consumer;
const useAccordionContext = (): AccordionState => useContext(AccordionContext);

export default AccordionContext;
export { AccordionProvider, AccordionConsumer, useAccordionContext };
