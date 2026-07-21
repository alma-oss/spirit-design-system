'use client';

import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';

export interface UseComboboxDisclosureStateProps {
  inputRef: RefObject<HTMLInputElement>;
  isDisabled?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export interface ComboboxDisclosureState {
  activeDescendantId: string | undefined;
  close: () => void;
  focusInput: () => void;
  handleDropdownToggle: () => void;
  open: () => void;
  setActiveDescendantId: (id: string | undefined) => void;
}

/**
 * Combobox disclosure helpers: open/close, dropdown toggle, and activedescendant lifecycle.
 *
 * @param props Disclosure state props
 * @param props.inputRef Filter input element ref
 * @param props.isDisabled Whether the Combobox is disabled
 * @param props.isOpen Controlled open state
 * @param props.onToggle Open state toggle handler
 */
export const useComboboxDisclosureState = ({
  inputRef,
  isDisabled = false,
  isOpen,
  onToggle,
}: UseComboboxDisclosureStateProps): ComboboxDisclosureState => {
  const [activeDescendantId, setActiveDescendantId] = useState<string | undefined>();
  // Keep a live open flag so `open()`/`close()` stay idempotent within the same event
  // (e.g. ArrowDown opens, then a nested handler must not toggle closed again).
  const isOpenRef = useRef(isOpen);

  isOpenRef.current = isOpen;

  const open = useCallback(() => {
    if (isOpenRef.current || isDisabled) {
      return;
    }

    isOpenRef.current = true;
    onToggle();
  }, [isDisabled, onToggle]);

  const close = useCallback(() => {
    if (isOpenRef.current) {
      isOpenRef.current = false;
      onToggle();
    }

    setActiveDescendantId(undefined);
  }, [onToggle]);

  const handleDropdownToggle = useCallback(() => {
    if (isOpenRef.current) {
      close();
    } else {
      open();
    }
  }, [close, open]);

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
