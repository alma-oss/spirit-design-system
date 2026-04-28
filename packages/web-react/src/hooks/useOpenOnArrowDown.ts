'use client';

import { type KeyboardEventHandler, useCallback } from 'react';

export interface UseOpenOnArrowDownProps {
  /** Whether target overlay is already open. */
  isOpen: boolean;
  /** Callback to toggle overlay state. */
  onToggle: () => void;
  /** Optional consumer keydown handler invoked first. */
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
}

/**
 * Composes keydown behavior to open an overlay on ArrowDown.
 *
 * @param props - Hook configuration.
 * @param props.isOpen - Whether the overlay is already open.
 * @param props.onToggle - Callback to open/close overlay.
 * @param props.onKeyDown - Optional consumer keydown handler.
 * @returns {KeyboardEventHandler<HTMLElement>} Composed keydown handler.
 */
export const useOpenOnArrowDown = ({
  isOpen,
  onToggle,
  onKeyDown,
}: UseOpenOnArrowDownProps): KeyboardEventHandler<HTMLElement> =>
  useCallback(
    (event) => {
      onKeyDown?.(event);

      if (event.defaultPrevented || event.key !== 'ArrowDown' || isOpen) {
        return;
      }

      event.preventDefault();
      onToggle();
    },
    [isOpen, onKeyDown, onToggle],
  );
