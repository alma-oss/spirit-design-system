'use client';

import { type MutableRefObject, type TransitionEvent, useCallback, useEffect, useRef } from 'react';
import { CLASS_NAME_OPEN } from '../../constants';
import { useScrollControl } from '../../hooks';
import { TRANSITION_FALLBACK_TIMEOUT } from './constants';

export const useDialog = (ref: MutableRefObject<HTMLDialogElement | null>, isOpen: boolean) => {
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleDialogClose = useCallback(
    (dialogNode: HTMLDialogElement) => {
      clearCloseTimeout();
      closeTimeoutRef.current = setTimeout(() => {
        if (dialogNode.open && dialogNode.close) {
          dialogNode.close();
        }
      }, TRANSITION_FALLBACK_TIMEOUT);
    },
    [clearCloseTimeout],
  );

  const handleTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDialogElement>) => {
      const dialogNode = ref?.current;

      // Only handle transition end if it's for the dialog element itself (not children)
      if (dialogNode && event.target === dialogNode && !isOpen && dialogNode.open && dialogNode.close) {
        // Clear the fallback timeout since transitionend fired successfully
        clearCloseTimeout();
        // Dialog transition has ended, now close it
        dialogNode.close();
      }
    },
    [isOpen, ref, clearCloseTimeout],
  );

  useScrollControl(ref, isOpen);

  // Helper function to manage the open class state
  const setOpenClass = useCallback(
    (shouldAdd: boolean) => {
      const dialogNode = ref?.current;

      if (dialogNode?.classList) {
        if (shouldAdd) {
          dialogNode.classList.add(CLASS_NAME_OPEN);
        } else {
          dialogNode.classList.remove(CLASS_NAME_OPEN);
        }
      }
    },
    [ref],
  );

  // Handle declarative dialog state changes via isOpen prop
  useEffect(() => {
    const dialogNode = ref?.current;

    if (dialogNode) {
      // Opening: When isOpen becomes true
      if (isOpen) {
        clearCloseTimeout(); // Clear any pending close timeout
        if (!dialogNode.open && dialogNode.showModal) {
          dialogNode.showModal(); // Show the dialog element
          setOpenClass(true); // Add visual state class for CSS transitions
        }
      }
      // Closing: When isOpen becomes false and dialog is currently open
      else if (!isOpen && dialogNode.open) {
        setOpenClass(false); // Remove visual state class to trigger CSS transition
        // Set fallback timeout in case transitionend doesn't fire
        scheduleDialogClose(dialogNode);
      }
    }

    return () => {
      clearCloseTimeout();
    };
  }, [isOpen, ref, setOpenClass, clearCloseTimeout, scheduleDialogClose]);

  // Imperative function to open dialog programmatically
  const openDialog = () => {
    const dialogNode = ref?.current;

    if (dialogNode) {
      clearCloseTimeout(); // Clear any pending close timeout

      if (!dialogNode.open && dialogNode.showModal) {
        dialogNode.showModal(); // Show the dialog element
        setOpenClass(true); // Add visual state class for CSS transitions
      }
    }
  };

  // Imperative function to close dialog programmatically
  const closeDialog = () => {
    const dialogNode = ref?.current;

    if (dialogNode && dialogNode.open) {
      setOpenClass(false); // Remove visual state class to trigger CSS transition
      // Set fallback timeout in case transitionend doesn't fire
      scheduleDialogClose(dialogNode);
    }
  };

  return {
    openDialog,
    closeDialog,
    onTransitionEnd: handleTransitionEnd,
  };
};
