'use client';

import { type RefObject, useCallback, useMemo } from 'react';
import { MULTIPLE_SELECTION_MODE } from '../../constants';
import { getToggledSelectedKeys } from '../../hooks';
import { useComboboxDisclosureState } from './useComboboxDisclosureState';
import { createSelectedKeysSet } from './utils';

export interface UseComboboxStateProps {
  inputRef: RefObject<HTMLInputElement>;
  inputValue: string;
  isDisabled?: boolean;
  isOpen: boolean;
  onInputChange: (value: string) => void;
  onSelectionChange: (keys: string[]) => void;
  onToggle: () => void;
  selectedKeys: string[];
}

export interface ComboboxState {
  activeDescendantId: string | undefined;
  close: () => void;
  focusInput: () => void;
  handleDropdownToggle: () => void;
  inputValue: string;
  isOpen: boolean;
  onInputChange: (value: string) => void;
  open: () => void;
  removeAll: () => void;
  removeItem: (key: string) => void;
  selectedKeys: string[];
  selectedKeysSet: ReadonlySet<string>;
  setActiveDescendantId: (id: string | undefined) => void;
  toggleOption: (optionId: string, options?: { isDisabled?: boolean; warmLabel?: () => void }) => void;
}

/**
 * Single source of truth for Combobox open/selection/input state and selection actions.
 * Controlled and uncontrolled entry points share the same return shape.
 *
 * @param props Combobox state props
 * @param props.inputRef Filter input element ref
 * @param props.inputValue Controlled filter value
 * @param props.isDisabled Whether the Combobox is disabled
 * @param props.isOpen Controlled open state
 * @param props.onInputChange Filter value change handler
 * @param props.onSelectionChange Selection change handler
 * @param props.onToggle Open state toggle handler
 * @param props.selectedKeys Controlled selected keys
 */
export const useComboboxState = ({
  inputRef,
  inputValue,
  isDisabled = false,
  isOpen,
  onInputChange,
  onSelectionChange,
  onToggle,
  selectedKeys,
}: UseComboboxStateProps): ComboboxState => {
  const { activeDescendantId, close, focusInput, handleDropdownToggle, open, setActiveDescendantId } =
    useComboboxDisclosureState({ inputRef, isDisabled, isOpen, onToggle });
  const selectedKeysSet = useMemo(() => createSelectedKeysSet(selectedKeys), [selectedKeys]);

  const toggleOption = useCallback(
    (optionId: string, options?: { isDisabled?: boolean; warmLabel?: () => void }) => {
      if (options?.isDisabled) {
        return;
      }

      options?.warmLabel?.();
      onSelectionChange(getToggledSelectedKeys(selectedKeys, optionId, MULTIPLE_SELECTION_MODE));
      onInputChange('');
    },
    [onInputChange, onSelectionChange, selectedKeys],
  );

  const removeItem = useCallback(
    (key: string) => {
      onSelectionChange(selectedKeys.filter((selectedKey) => selectedKey !== key));
    },
    [onSelectionChange, selectedKeys],
  );

  const removeAll = useCallback(() => {
    onSelectionChange([]);
    focusInput();
  }, [focusInput, onSelectionChange]);

  return {
    activeDescendantId,
    close,
    focusInput,
    handleDropdownToggle,
    inputValue,
    isOpen,
    onInputChange,
    open,
    removeAll,
    removeItem,
    selectedKeys,
    selectedKeysSet,
    setActiveDescendantId,
    toggleOption,
  };
};
