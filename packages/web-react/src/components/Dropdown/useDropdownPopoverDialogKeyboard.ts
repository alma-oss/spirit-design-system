'use client';

import { type KeyboardEvent, type KeyboardEventHandler, type MutableRefObject, useCallback } from 'react';
import { type ClickEvent } from '../../types';
import { getFocusableElements } from './utils';

export interface UseDropdownPopoverDialogKeyboardOptions {
  isOpen: boolean;
  onToggle: (event?: ClickEvent) => void;
  triggerRef: MutableRefObject<HTMLElement | null | undefined>;
}

/**
 * Handles Tab-out keyboard interactions for a DropdownPopover used as a non-modal anchored dialog:
 * - Tab from the last focusable element: closes the popover and returns focus to the trigger.
 * - Shift+Tab from the first focusable element: closes the popover and returns focus to the trigger.
 *
 * Escape is handled at the Dropdown wrapper level so it works even when focus is on the trigger.
 *
 * @param options - Hook configuration.
 * @param options.isOpen - Whether the popover is open.
 * @param options.onToggle - Toggle the popover open/closed state.
 * @param options.triggerRef - Ref to the trigger element; receives focus after the popover closes.
 * @returns {{ onPopoverKeyDownCapture: KeyboardEventHandler<HTMLDivElement> }}
 * Attach `onPopoverKeyDownCapture` to the popover content root.
 */
export const useDropdownPopoverDialogKeyboard = ({
  isOpen,
  onToggle,
  triggerRef,
}: UseDropdownPopoverDialogKeyboardOptions): {
  onPopoverKeyDownCapture: KeyboardEventHandler<HTMLDivElement>;
} => {
  const close = useCallback(() => {
    if (!isOpen) {
      return;
    }

    onToggle();

    Promise.resolve().then(() => {
      triggerRef.current?.focus();
    });
  }, [isOpen, onToggle, triggerRef]);

  const onPopoverKeyDownCapture = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen || event.key !== 'Tab') {
        return;
      }

      const focusables = getFocusableElements(event.currentTarget);
      const target = event.target instanceof Node ? event.target : null;
      const active = document.activeElement;

      if (event.shiftKey) {
        const firstFocusable = focusables.length > 0 ? focusables[0]! : null;

        if (!firstFocusable || (target !== firstFocusable && active !== firstFocusable)) {
          return;
        }

        event.preventDefault();
        close();
      } else {
        const lastFocusable = focusables.length > 0 ? focusables[focusables.length - 1]! : null;

        if (!lastFocusable || (target !== lastFocusable && active !== lastFocusable)) {
          return;
        }

        event.preventDefault();
        close();
      }
    },
    [close, isOpen],
  );

  return { onPopoverKeyDownCapture };
};
