'use client';

import { type RefObject, useCallback, useEffect, useState } from 'react';

export interface UseComboboxOpenStateProps {
  inputRef: RefObject<HTMLInputElement | null>;
  isDisabled?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export interface UseComboboxOpenStateReturn {
  activeDescendantId: string | undefined;
  close: () => void;
  focusInput: () => void;
  handleDropdownToggle: () => void;
  open: () => void;
  setActiveDescendantId: (id: string | undefined) => void;
}

/**
 * Open/close controls and `aria-activedescendant` lifecycle for Combobox.
 *
 * @param props Hook configuration
 * @param props.inputRef Combobox input
 * @param props.isDisabled Whether the Combobox is disabled
 * @param props.isOpen Whether the popover is open
 * @param props.onToggle Toggle open state
 * @returns {{ open: () => void, close: () => void, handleDropdownToggle: () => void, activeDescendantId: string | undefined, setActiveDescendantId: (id: string | undefined) => void, focusInput: () => void }}
 */
export const useComboboxOpenState = ({
  inputRef,
  isDisabled = false,
  isOpen,
  onToggle,
}: UseComboboxOpenStateProps): UseComboboxOpenStateReturn => {
  const [activeDescendantId, setActiveDescendantId] = useState<string | undefined>();

  const open = useCallback(() => {
    if (!isOpen && !isDisabled) {
      onToggle();
    }
  }, [isDisabled, isOpen, onToggle]);

  const close = useCallback(() => {
    if (isOpen) {
      onToggle();
    }

    setActiveDescendantId(undefined);
  }, [isOpen, onToggle]);

  const handleDropdownToggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      onToggle();
    }
  }, [close, isOpen, onToggle]);

  // Safety net for any close path that does not go through `close()` (e.g. parent-driven `isOpen`).
  useEffect(() => {
    if (!isOpen) {
      setActiveDescendantId(undefined);
    }
  }, [isOpen]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return {
    activeDescendantId,
    close,
    focusInput,
    handleDropdownToggle,
    open,
    setActiveDescendantId,
  };
};
