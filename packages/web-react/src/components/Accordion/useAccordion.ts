'use client';

import { useState } from 'react';
import { type AccordionOpenStateType, type AccordionState, type AccordionStateProps } from '../../types';

export const useAccordion = ({ defaultOpen, stayOpen }: AccordionStateProps): AccordionState => {
  const [open, setOpen] = useState<AccordionOpenStateType>(defaultOpen);

  const toggle = (id: string) => {
    if (stayOpen) {
      if (Array.isArray(open)) {
        if (open?.includes(id)) {
          setOpen(open.filter((accordionId) => accordionId !== id));
        } else {
          setOpen([...open, id]);
        }
      } else {
        setOpen([id]);
      }
    } else if (open === id) {
      setOpen(undefined);
    } else {
      setOpen(id);
    }
  };

  return {
    open,
    toggle,
  };
};
