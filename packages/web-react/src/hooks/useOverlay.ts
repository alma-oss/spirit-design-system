'use client';

import { type KeyboardEvent, type KeyboardEventHandler, type MutableRefObject, useCallback } from 'react';
import { useClickOutside } from './useClickOutside';

export interface UseOverlayProps {
  /** Whether the overlay is currently open. */
  isOpen: boolean;
  /** Ref to the overlay root element. */
  overlayRef: MutableRefObject<HTMLElement | null>;
  /** Callback called when the overlay should close. */
  onClose: (event?: Event | KeyboardEvent<HTMLElement>) => void;
  /** Whether Escape key should dismiss the overlay. */
  closeOnEscape?: boolean;
  /** Whether click outside should dismiss the overlay. */
  closeOnInteractOutside?: boolean;
  /** Optional callback fired before outside-interaction close. */
  onInteractOutside?: (event: Event) => void;
  /** Optional outside-interaction close callback. Overrides `onClose` for outside events. */
  onCloseOnInteractOutside?: (event: Event) => void;
}

export interface UseOverlayReturn {
  /** Attach to overlay root to handle keyboard dismissal. */
  onOverlayKeyDown: KeyboardEventHandler<HTMLElement>;
}

/**
 * Reusable overlay-close behavior for non-modal overlays.
 * Handles Escape dismissal and click-outside dismissal.
 *
 * @param props - Hook configuration.
 * @param props.isOpen - Whether overlay is currently open.
 * @param props.overlayRef - Ref to the overlay root element.
 * @param props.onClose - Callback called when overlay should close.
 * @param props.closeOnEscape - Whether Escape should trigger close.
 * @param props.closeOnInteractOutside - Whether outside interaction should trigger close.
 * @param props.onInteractOutside - Optional callback fired on outside interaction before close.
 * @param props.onCloseOnInteractOutside - Optional outside close callback overriding default `onClose`.
 * @returns {UseOverlayReturn} Keyboard handlers for overlay close behavior.
 */
export const useOverlay = ({
  isOpen,
  overlayRef,
  onClose,
  closeOnEscape = true,
  closeOnInteractOutside = true,
  onInteractOutside,
  onCloseOnInteractOutside,
}: UseOverlayProps): UseOverlayReturn => {
  const handleInteractOutside = useCallback(
    (event: Event) => {
      if (!isOpen || !closeOnInteractOutside) {
        return;
      }

      onInteractOutside?.(event);

      if (onCloseOnInteractOutside) {
        onCloseOnInteractOutside(event);

        return;
      }

      onClose(event);
    },
    [closeOnInteractOutside, isOpen, onClose, onCloseOnInteractOutside, onInteractOutside],
  );

  useClickOutside({ ref: overlayRef, callback: handleInteractOutside });

  const onOverlayKeyDown = useCallback<KeyboardEventHandler<HTMLElement>>(
    (event) => {
      if (!isOpen || !closeOnEscape || event.key !== 'Escape' || event.defaultPrevented) {
        return;
      }

      onClose(event);
    },
    [closeOnEscape, isOpen, onClose],
  );

  return { onOverlayKeyDown };
};
