'use client';

import {
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import { KeyboardKey } from '../../constants';
import { useI18n } from '../../hooks';
import { replaceTranslationParams } from '../../translations';
import { blockDefaultReactions } from '../../utils';
import {
  type SplitTagListboxOptionProps,
  useSplitTagListboxKeyboard,
} from '../UNSTABLE_SplitTag/useSplitTagListboxKeyboard';
import { useComboboxContext } from './ComboboxContext';
import type { SpiritUnstableComboboxSplitTagProps, UnstableComboboxSplitTagSelectOption } from './types';
import { getNodeText } from './utils';

const SELECTION_GRID_KEYS = new Set<string>([
  KeyboardKey.ArrowDown,
  KeyboardKey.ArrowUp,
  KeyboardKey.ArrowLeft,
  KeyboardKey.ArrowRight,
  KeyboardKey.Home,
  KeyboardKey.End,
  KeyboardKey.Delete,
  KeyboardKey.Backspace,
]);

const normalizeSelectOptions = (
  options: UnstableComboboxSplitTagSelectOption[],
): Array<{ value: string; label: ReactNode }> =>
  options.map((option) => (typeof option === 'string' ? { value: option, label: option } : option));

export interface UseComboboxSplitTagReturn {
  closeButtonRef: RefObject<HTMLButtonElement>;
  dropdownId: string;
  getOptionProps: (value: string) => SplitTagListboxOptionProps;
  handleCloseKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  handleSelectKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  handleSelectToggle: () => void;
  isDisabled: boolean;
  isSelectOpen: boolean;
  label: ReactNode;
  labelText: string;
  listboxLabel: string;
  listboxRef: RefObject<HTMLDivElement>;
  onRemove: () => void;
  removeButtonAriaLabel: string;
  rowKeyboardProps: {
    onBlurCapture?: (event: FocusEvent<HTMLElement>) => void;
    onFocusCapture?: (event: FocusEvent<HTMLElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
    tabIndex?: 0 | -1;
  };
  secondaryControlTabIndex: 0 | -1;
  select: SpiritUnstableComboboxSplitTagProps['select'];
  selectOptions: Array<{ value: string; label: ReactNode }>;
  selectTriggerAriaLabel: string;
  selectTriggerRef: RefObject<HTMLElement | null>;
  selectedLabelText: string;
  selectedOptionLabel: ReactNode;
}

/**
 * Logic for `UNSTABLE_ComboboxSplitTag`: nested select keyboard/focus, Combobox popover
 * coordination, and selection-grid key wrapping. Nested select open state is controlled via
 * `select.isOpen` / `select.onToggle` (e.g. `useDisclosureState` in the consumer).
 *
 * @param props Combobox split-tag props
 */
export const useComboboxSplitTag = (props: SpiritUnstableComboboxSplitTagProps): UseComboboxSplitTagReturn => {
  const { label, onRemove, removeLabel, tagKeyboardProps, isDisabled: isDisabledProp, select } = props;
  const { t } = useI18n();
  const {
    isOpen: isComboboxOpen = false,
    onToggle: onComboboxToggle,
    isDisabled: isComboboxDisabled = false,
  } = useComboboxContext();
  const isDisabled = isDisabledProp ?? isComboboxDisabled;
  const isSelectOpen = select.isOpen;
  const { onToggle: onSelectToggle } = select;

  const reactId = useId();
  const dropdownId = select.id ?? `combobox-split-tag-select${reactId}`;

  const selectOptions = useMemo(() => normalizeSelectOptions(select.options), [select.options]);
  const optionValues = useMemo(() => selectOptions.map((option) => option.value), [selectOptions]);
  const selectedOptionLabel = selectOptions.find((option) => option.value === select.value)?.label ?? select.value;

  const selectTriggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const shouldFocusSelectOptionRef = useRef(false);
  const wasComboboxOpenRef = useRef(isComboboxOpen);

  const labelText = getNodeText(label);
  const selectedLabelText = getNodeText(selectedOptionLabel);
  const removeButtonAriaLabel =
    removeLabel ??
    replaceTranslationParams(t('combobox.removeItemLabel'), {
      itemLabel: labelText,
    });
  const selectTriggerAriaLabel =
    select['aria-label'] ??
    replaceTranslationParams(t('combobox.splitTagSelectLabel'), {
      selectedLabel: selectedLabelText,
    });
  const listboxLabel = select.listboxLabel ?? t('combobox.splitTagListboxLabel');

  const getOptionId = useCallback(
    (optionValue: string) => `${dropdownId}-option-${optionValues.indexOf(optionValue)}`,
    [dropdownId, optionValues],
  );

  const focusSelectedOrFirstOption = useCallback(() => {
    const selectedOption = document.getElementById(getOptionId(select.value));
    const fallbackOption = listboxRef.current?.querySelector<HTMLElement>('[role="option"]');

    (selectedOption ?? fallbackOption)?.focus();
  }, [getOptionId, select.value]);

  const closeSelect = useCallback(() => {
    if (isSelectOpen) {
      onSelectToggle();
    }
  }, [isSelectOpen, onSelectToggle]);

  const openSelect = useCallback(() => {
    if (!isSelectOpen) {
      onSelectToggle();
    }
  }, [isSelectOpen, onSelectToggle]);

  useEffect(() => {
    if (!isSelectOpen || !shouldFocusSelectOptionRef.current) {
      return;
    }

    shouldFocusSelectOptionRef.current = false;
    focusSelectedOrFirstOption();
  }, [focusSelectedOrFirstOption, isSelectOpen]);

  // Close nested select when the Combobox options popover opens (e.g. user tabs to input and types).
  useEffect(() => {
    const wasComboboxOpen = wasComboboxOpenRef.current;

    wasComboboxOpenRef.current = isComboboxOpen;

    if (!wasComboboxOpen && isComboboxOpen && isSelectOpen) {
      onSelectToggle();
    }
  }, [isComboboxOpen, isSelectOpen, onSelectToggle]);

  const handleSelectOption = useCallback(
    (nextValue: string) => {
      select.onChange(nextValue);
      closeSelect();
      selectTriggerRef.current?.focus();
    },
    [closeSelect, select],
  );

  const { getOptionProps } = useSplitTagListboxKeyboard({
    getOptionId,
    isDisabled,
    listboxRef,
    onSelect: handleSelectOption,
    optionValues,
    selectedValue: select.value,
  });

  const openSelectMenu = () => {
    if (isSelectOpen || isDisabled) {
      return;
    }

    if (isComboboxOpen) {
      onComboboxToggle?.();
    }
    shouldFocusSelectOptionRef.current = true;
    openSelect();
  };

  const handleSelectToggle = () => {
    if (isDisabled) {
      return;
    }

    if (!isSelectOpen && isComboboxOpen) {
      onComboboxToggle?.();
    }
    onSelectToggle();
  };

  const handleSelectKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === KeyboardKey.ArrowRight) {
      if (isSelectOpen) {
        return;
      }

      blockDefaultReactions(event);
      closeButtonRef.current?.focus();

      return;
    }

    if (
      event.key === KeyboardKey.ArrowDown ||
      event.key === KeyboardKey.ArrowUp ||
      event.key === KeyboardKey.Home ||
      event.key === KeyboardKey.End
    ) {
      blockDefaultReactions(event);

      if (!isSelectOpen) {
        if (event.key === KeyboardKey.ArrowDown) {
          openSelectMenu();
        }

        return;
      }

      focusSelectedOrFirstOption();
    }
  };

  const handleCloseKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === KeyboardKey.ArrowLeft) {
      blockDefaultReactions(event);
      selectTriggerRef.current?.focus();
    }
  };

  const handleRowKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.defaultPrevented) {
      return;
    }

    if (isSelectOpen && SELECTION_GRID_KEYS.has(event.key)) {
      return;
    }

    tagKeyboardProps?.onKeyDown(event);
  };

  const handleDropdownBlurCapture = (event: FocusEvent<HTMLElement>) => {
    if (!isSelectOpen) {
      return;
    }

    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node) {
      if (selectTriggerRef.current?.contains(nextTarget) || listboxRef.current?.contains(nextTarget)) {
        return;
      }
    }

    closeSelect();
  };

  const enabledControlTabIndex = tagKeyboardProps?.secondaryControlTabIndex ?? 0;
  const secondaryControlTabIndex: 0 | -1 = isDisabled ? -1 : enabledControlTabIndex;

  const handleRowBlurCapture = (event: FocusEvent<HTMLElement>) => {
    handleDropdownBlurCapture(event);
    tagKeyboardProps?.onBlurCapture?.(event);
  };

  const rowKeyboardProps =
    isDisabled || !tagKeyboardProps
      ? {}
      : {
          onBlurCapture: handleRowBlurCapture,
          onFocusCapture: tagKeyboardProps.onFocusCapture,
          onKeyDown: handleRowKeyDown,
          tabIndex: tagKeyboardProps.tabIndex,
        };

  return {
    closeButtonRef,
    dropdownId,
    getOptionProps,
    handleCloseKeyDown,
    handleSelectKeyDown,
    handleSelectToggle,
    isDisabled,
    isSelectOpen,
    label,
    labelText,
    listboxLabel,
    listboxRef,
    onRemove,
    removeButtonAriaLabel,
    rowKeyboardProps,
    secondaryControlTabIndex,
    select,
    selectOptions,
    selectTriggerAriaLabel,
    selectTriggerRef,
    selectedLabelText,
    selectedOptionLabel,
  };
};
