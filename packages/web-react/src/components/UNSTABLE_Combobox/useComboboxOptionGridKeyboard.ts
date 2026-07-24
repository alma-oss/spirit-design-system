'use client';

import { type KeyboardEvent, type RefObject, useCallback } from 'react';
import { getOptionValueFromRow, getVisibleOptionRows } from './utils';

export interface UseComboboxOptionGridKeyboardProps {
  listboxRef: RefObject<HTMLElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  isOpen: boolean;
  isDisabled?: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onOpen: () => void;
  onClose: () => void;
  onToggleOption: (optionId: string) => void;
  setActiveDescendantId: (id: string | undefined) => void;
}

/**
 * Focus an option row and sync `aria-activedescendant` on the combobox input.
 *
 * @param rowEl Option row
 * @param setActiveDescendantId State setter for activedescendant
 */
const focusOptionRow = (
  rowEl: HTMLElement | null | undefined,
  setActiveDescendantId: (id: string | undefined) => void,
) => {
  if (!rowEl) {
    return;
  }

  rowEl.focus();
  rowEl.scrollIntoView({ block: 'nearest' });

  if (rowEl.id) {
    setActiveDescendantId(rowEl.id);
  }
};

/**
 * Keyboard navigation for the combobox option grid and the filter input.
 *
 * @param props Hook configuration
 * @param props.listboxRef
 * @param props.inputRef
 * @param props.isOpen
 * @param props.isDisabled
 * @param props.inputValue
 * @param props.onInputChange
 * @param props.onOpen
 * @param props.onClose
 * @param props.onToggleOption
 * @param props.setActiveDescendantId
 * @returns {{ onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void, onListboxKeyDown: (event: KeyboardEvent<HTMLElement>) => void }}
 */
export const useComboboxOptionGridKeyboard = ({
  listboxRef,
  inputRef,
  isOpen,
  isDisabled = false,
  inputValue,
  onInputChange,
  onOpen,
  onClose,
  onToggleOption,
  setActiveDescendantId,
}: UseComboboxOptionGridKeyboardProps): {
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onListboxKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
} => {
  const clearActiveDescendant = useCallback(() => {
    setActiveDescendantId(undefined);
  }, [setActiveDescendantId]);

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (isDisabled) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        clearActiveDescendant();
        onClose();

        return;
      }

      if (event.key === 'Tab') {
        clearActiveDescendant();
        onClose();

        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();

        if (!isOpen) {
          onOpen();
        }

        const visible = getVisibleOptionRows(listboxRef.current);

        if (!visible.length) {
          return;
        }

        focusOptionRow(event.key === 'ArrowDown' ? visible[0] : visible[visible.length - 1], setActiveDescendantId);
      }
    },
    [clearActiveDescendant, isDisabled, isOpen, listboxRef, onClose, onOpen, setActiveDescendantId],
  );

  const onListboxKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (isDisabled) {
        return;
      }

      const visible = getVisibleOptionRows(listboxRef.current);
      const focused = document.activeElement;
      const currentIndex = focused instanceof HTMLElement ? visible.indexOf(focused) : -1;

      if (currentIndex === -1) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        clearActiveDescendant();
        onClose();
        inputRef.current?.focus();

        return;
      }

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          event.preventDefault();
          clearActiveDescendant();
          onClose();
          inputRef.current?.focus();
        } else {
          clearActiveDescendant();
          onClose();
        }

        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();

        if (currentIndex < visible.length - 1) {
          focusOptionRow(visible[currentIndex + 1], setActiveDescendantId);
        }

        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();

        if (currentIndex > 0) {
          focusOptionRow(visible[currentIndex - 1], setActiveDescendantId);
        } else {
          clearActiveDescendant();
          inputRef.current?.focus();
        }

        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();
        focusOptionRow(visible[0], setActiveDescendantId);

        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        focusOptionRow(visible[visible.length - 1], setActiveDescendantId);

        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();

        const row = visible[currentIndex];
        const optionValue = row ? getOptionValueFromRow(row) : '';

        if (optionValue && row?.getAttribute('aria-disabled') !== 'true') {
          onToggleOption(optionValue);
        }

        return;
      }

      if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
        onInputChange(inputValue + event.key);
        clearActiveDescendant();
        inputRef.current?.focus();
      }
    },
    [
      clearActiveDescendant,
      inputRef,
      inputValue,
      isDisabled,
      listboxRef,
      onClose,
      onInputChange,
      onToggleOption,
      setActiveDescendantId,
    ],
  );

  return { onInputKeyDown, onListboxKeyDown };
};
