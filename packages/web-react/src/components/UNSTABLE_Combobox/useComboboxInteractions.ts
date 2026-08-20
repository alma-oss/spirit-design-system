'use client';

import { type FocusEvent, type KeyboardEvent, type MouseEvent, type RefObject, useCallback } from 'react';
import { COMBOBOX_OPTION_ITEM_SELECTOR } from './constants';
import { useComboboxOptionGridKeyboard } from './useComboboxOptionGridKeyboard';
import { getOptionRowFromFocus, getOptionValueFromRow, isOptionRowDisabled } from './utils';

export interface UseComboboxInteractionsProps {
  activeDescendantId?: string;
  /** When true, Backspace on the empty filter focuses the last selected tag */
  canFocusLastTag?: boolean;
  close: () => void;
  focusInput: () => void;
  getOptionRowEl: (optionId: string) => HTMLElement | null;
  getVisibleOptionRows: () => HTMLElement[];
  inputRef: RefObject<HTMLInputElement>;
  isDisabled?: boolean;
  isOpen: boolean;
  listboxRef: RefObject<HTMLElement | null>;
  onInputChange: (value: string) => void;
  /** Focus the last selected tag (Backspace on empty filter; Gmail-style) */
  onFocusLastTag?: () => void;
  open: () => void;
  setActiveDescendantId: (id: string | undefined) => void;
  toggleOption: (optionId: string, options?: { isDisabled?: boolean; warmLabel?: () => void }) => void;
  warmItemLabel: (optionId: string) => void;
}

export interface UseComboboxInteractionsReturn {
  activeNestedControlIndex: number | null;
  clearActiveNestedControl: () => void;
  handleGroupClick: (event: MouseEvent<HTMLElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleListboxFocusCapture: (event: FocusEvent<HTMLElement>) => void;
  handleListboxMouseDown: (event: MouseEvent<HTMLElement>) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Input / options-widget event handlers for Combobox (pointer, typing, keyboard, toggle).
 *
 * The popover opens on pointer interaction (click), typing, or Arrow Up/Down — not on keyboard focus alone (Tab).
 *
 * @param props Hook configuration
 * @param props.activeDescendantId Id of the visually active option
 * @param props.canFocusLastTag Whether Backspace may move focus to the last selected tag
 * @param props.close Close the options popover
 * @param props.focusInput Focus the filter input
 * @param props.getOptionRowEl Resolve an option row element by value
 * @param props.getVisibleOptionRows Mounted option rows from the collection
 * @param props.inputRef Filter input element ref
 * @param props.isDisabled Whether the Combobox is disabled
 * @param props.isOpen Whether the options popover is open
 * @param props.listboxRef Options widget element ref
 * @param props.onInputChange Filter input change handler
 * @param props.onFocusLastTag Focus the last selected tag from an empty filter
 * @param props.open Open the options popover
 * @param props.setActiveDescendantId State setter for activedescendant
 * @param props.toggleOption Toggle selection for an option value
 * @param props.warmItemLabel Keep a selected option label warm in cache
 */
export const useComboboxInteractions = ({
  activeDescendantId,
  canFocusLastTag = false,
  close,
  focusInput,
  getOptionRowEl,
  getVisibleOptionRows,
  inputRef,
  isDisabled = false,
  isOpen,
  listboxRef,
  onInputChange,
  onFocusLastTag,
  open,
  setActiveDescendantId,
  toggleOption,
  warmItemLabel,
}: UseComboboxInteractionsProps): UseComboboxInteractionsReturn => {
  const handleToggleOption = useCallback(
    (optionId: string) => {
      const rowEl = getOptionRowEl(optionId);

      toggleOption(optionId, {
        isDisabled: isOptionRowDisabled(rowEl),
        warmLabel: () => warmItemLabel(optionId),
      });
    },
    [getOptionRowEl, toggleOption, warmItemLabel],
  );

  const { onInputKeyDown, activeNestedControlIndex, clearActiveNestedControl } = useComboboxOptionGridKeyboard({
    listboxRef,
    inputRef,
    isOpen,
    isDisabled,
    activeDescendantId,
    canFocusLastTag,
    getVisibleOptionRows,
    onOpen: open,
    onClose: close,
    onToggleOption: handleToggleOption,
    onFocusLastTag,
    setActiveDescendantId,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.currentTarget.value);
    // Filtering changes the option set — drop any stale visual active option.
    setActiveDescendantId(undefined);
    open();
  };

  const handleGroupClick = (event: MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      return;
    }

    const target = event.target as HTMLElement;

    // Skip selection chrome and nested overlays (e.g. SplitTag distance trigger) so clicks
    // on those controls do not steal focus or reopen the Combobox popover.
    // Do not match `.Dropdown`: the Combobox field itself lives inside the options Dropdown.
    // Tag chrome is covered by `[role="row"]` (including custom SplitTag rows) — no component classnames.
    if (target.closest('[role="row"], button, a, [role="button"], [data-spirit-toggle]')) {
      return;
    }

    focusInput();
    open();
  };

  // Consumer code may still focus an option (e.g. after removing a row); keep activedescendant in sync.
  const handleListboxFocusCapture = (event: FocusEvent<HTMLElement>) => {
    const option = getOptionRowFromFocus(event.target, getVisibleOptionRows());

    if (option?.id) {
      setActiveDescendantId(option.id);
    }
  };

  const handleListboxMouseDown = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    // Let nested controls (links, remove buttons) handle their own activation.
    if (target.closest('a, button, [role="button"]')) {
      return;
    }

    const option = target.closest<HTMLElement>(COMBOBOX_OPTION_ITEM_SELECTOR);

    if (!option || !listboxRef.current?.contains(option)) {
      return;
    }

    // Keep DOM focus on the filter input (pure aria-activedescendant model).
    event.preventDefault();

    const optionValue = getOptionValueFromRow(option);

    if (isOptionRowDisabled(option) || !optionValue) {
      return;
    }

    handleToggleOption(optionValue);
  };

  return {
    activeNestedControlIndex,
    clearActiveNestedControl,
    handleGroupClick,
    handleInputChange,
    handleListboxFocusCapture,
    handleListboxMouseDown,
    onInputKeyDown,
  };
};
