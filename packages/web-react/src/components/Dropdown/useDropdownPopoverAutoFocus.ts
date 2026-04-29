'use client';

import { type RefObject, useEffect } from 'react';
import { getFocusableElements } from './utils';

export interface UseDropdownPopoverAutoFocusOptions {
  /** Whether the popover is currently open. */
  isOpen: boolean;
  /** Ref to the popover container element. */
  popoverRef: RefObject<HTMLElement | null>;
}

/**
 * Moves focus to the first interactive element inside the popover when it opens.
 * This implements the dialog-pattern "initial focus" requirement.
 *
 * @param options - Hook configuration.
 * @param options.isOpen - Whether the popover is open.
 * @param options.popoverRef - Ref to the popover container element.
 */
export const useDropdownPopoverAutoFocus = ({ isOpen, popoverRef }: UseDropdownPopoverAutoFocusOptions): void => {
  useEffect(() => {
    if (!isOpen || !popoverRef.current) {
      return;
    }

    const first = getFocusableElements(popoverRef.current)[0];

    first?.focus();
  }, [isOpen, popoverRef]);
};
