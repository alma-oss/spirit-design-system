'use client';

import { type MutableRefObject, useState } from 'react';
import { useClickOutside } from '../../hooks';
import { type ClickEvent } from '../../types';

export interface UseDropdownProps {
  /** dropdown element reference */
  dropdownRef: MutableRefObject<HTMLElement | null>;
  /** enabled click outside event */
  enableAutoClose?: boolean;
  /** on close callback */
  onAutoClose?: (event: Event) => void;
  /** trigger element reference */
  triggerRef: MutableRefObject<HTMLElement | null | undefined>;
}

export interface UseDropdownReturn {
  /** collapse handler */
  toggleHandler: (event?: ClickEvent) => void;
  /** collapsed state */
  isOpen: boolean;
}

export const useDropdown = ({
  dropdownRef,
  triggerRef,
  enableAutoClose,
  onAutoClose,
}: UseDropdownProps): UseDropdownReturn => {
  const [open, setOpen] = useState<boolean>(false);

  const collapseHandler = () => setOpen(!open);

  const toggleHandler = (event?: ClickEvent) => {
    event?.preventDefault();
    collapseHandler();
  };

  const closeHandler = (event: Event) => {
    if (!enableAutoClose) {
      return;
    }

    if (!triggerRef?.current?.contains(event?.target as Node)) {
      if (onAutoClose) {
        onAutoClose(event);
      }

      setOpen(false);
    }
  };

  useClickOutside({ ref: dropdownRef, callback: closeHandler });

  return {
    toggleHandler,
    isOpen: open,
  };
};
