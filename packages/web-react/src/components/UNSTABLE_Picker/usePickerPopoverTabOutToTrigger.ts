'use client';

import { type KeyboardEvent, type KeyboardEventHandler, useCallback } from 'react';

/**
 * Matches interactive controls inside the picker popover (dialog), in document order.
 * Used to detect Tab from the last focusable (non-modal anchored dropdown pattern).
 */
export const PICKER_POPOVER_FOCUSABLE_SELECTOR =
  'input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]';

export const getPickerPopoverFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(PICKER_POPOVER_FOCUSABLE_SELECTOR));

export interface UsePickerPopoverTabOutToTriggerOptions {
  /** Optional focus registry from `PickerPopoverContext`; falls back to DOM query when missing. */
  getLastPopoverFocusable?: () => HTMLElement | null;
  isOpen: boolean;
  /**
   * Close the popover and restore focus to the trigger (e.g. picker’s imperative `close()`).
   * If you only pass `toggleOpen`, focus will not move to the trigger.
   */
  onClose: () => void;
}

/**
 * When the popover is open, Tab from the last focusable closes it via `onClose` (caller handles focus).
 *
 * @param options - Hook configuration.
 * @param options.isOpen - Whether the popover is open.
 * @param options.onClose - Close the popover and restore focus to the trigger (e.g. picker `close()`).
 * @param options.getLastPopoverFocusable - Optional; last focusable in the popover (registry or omit to query DOM).
 * @returns {{ onPopoverKeyDownCapture: KeyboardEventHandler<HTMLDivElement> }} Attach `onPopoverKeyDownCapture` to the popover content root.
 */
export const usePickerPopoverTabOutToTrigger = ({
  isOpen,
  onClose,
  getLastPopoverFocusable,
}: UsePickerPopoverTabOutToTriggerOptions): {
  onPopoverKeyDownCapture: KeyboardEventHandler<HTMLDivElement>;
} => {
  const onPopoverKeyDownCapture = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Tab' || event.shiftKey || !isOpen) {
        return;
      }

      const container = event.currentTarget;
      let lastFocusable = getLastPopoverFocusable?.() ?? null;
      if (!lastFocusable) {
        const focusables = getPickerPopoverFocusableElements(container);
        lastFocusable = focusables.length > 0 ? focusables[focusables.length - 1]! : null;
      }
      const target = event.target instanceof Node ? event.target : null;
      const active = document.activeElement;

      if (!lastFocusable || (target !== lastFocusable && active !== lastFocusable)) {
        return;
      }

      event.preventDefault();
      onClose();
    },
    [getLastPopoverFocusable, isOpen, onClose],
  );

  return { onPopoverKeyDownCapture };
};
