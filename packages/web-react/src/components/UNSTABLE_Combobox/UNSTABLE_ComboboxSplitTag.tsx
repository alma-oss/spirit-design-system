'use client';

import React, { type KeyboardEvent, useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { useContextProps } from '../../context';
import { useDisclosureState, useI18n } from '../../hooks';
import { replaceTranslationParams } from '../../translations';
import type { SizeExtendedDictionaryType } from '../../types';
import { ControlButton } from '../ControlButton';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../Dropdown';
import { Icon } from '../Icon';
import { Item } from '../Item';
import { Stack } from '../Stack';
import { Tag } from '../Tag';
import UNSTABLE_SplitTag from '../UNSTABLE_SplitTag/UNSTABLE_SplitTag';
import { useSplitTagListboxKeyboard } from '../UNSTABLE_SplitTag/useSplitTagListboxKeyboard';
import { VisuallyHidden } from '../VisuallyHidden';
import { useComboboxContext } from './ComboboxContext';
import type { SpiritUnstableComboboxSplitTagProps, UnstableComboboxSplitTagSelectOption } from './types';
import { getNodeText } from './utils';

const normalizeSelectOptions = (
  options: UnstableComboboxSplitTagSelectOption[],
): Array<{ value: string; label: React.ReactNode }> =>
  options.map((option) => (typeof option === 'string' ? { value: option, label: option } : option));

/**
 * Combobox selection row with a SplitTag shell: label + nested select + remove.
 * Pass `tagKeyboardProps` from `renderTags` like `UNSTABLE_ComboboxTag`.
 * Nested Tag / ControlButton size and `isDisabled` come from Combobox `ContextPropsProvider`.
 * Nested select open state uses `useDisclosureState`.
 *
 * @param props Combobox split-tag props
 */
const UNSTABLE_ComboboxSplitTag = (props: SpiritUnstableComboboxSplitTagProps) => {
  const { label, onRemove, removeLabel, tagKeyboardProps, isDisabled: isDisabledProp, select } = props;
  const { t } = useI18n();
  const {
    isOpen: isComboboxOpen = false,
    onToggle: onComboboxToggle,
    isDisabled: isComboboxDisabled = false,
  } = useComboboxContext();
  const { size: nestedTagSize } = useContextProps<{ size?: SizeExtendedDictionaryType }>({}, 'tag');
  const { size: controlButtonSize } = useContextProps<{ size?: SizeExtendedDictionaryType }>({}, 'controlButton');
  const isDisabled = isDisabledProp ?? isComboboxDisabled;

  const reactId = useId();
  const dropdownId = select.id ?? `combobox-split-tag-select${reactId}`;

  const selectOptions = useMemo(() => normalizeSelectOptions(select.options), [select.options]);
  const optionValues = useMemo(() => selectOptions.map((option) => option.value), [selectOptions]);
  const selectedOptionLabel = selectOptions.find((option) => option.value === select.value)?.label ?? select.value;

  const {
    isExpanded: isSelectOpen,
    expand: expandSelect,
    collapse: collapseSelect,
    toggle: toggleSelect,
  } = useDisclosureState({ defaultExpanded: false });
  const selectTriggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const shouldFocusSelectOptionRef = useRef(false);

  const labelText = getNodeText(label);
  const selectedLabelText = getNodeText(selectedOptionLabel);
  const removeButtonAriaLabel =
    removeLabel ??
    replaceTranslationParams(t('combobox.removeItemLabel'), {
      itemLabel: labelText,
    });
  const selectTriggerAriaLabel = select['aria-label'] ?? `Select option, selected ${selectedLabelText}`;
  const listboxLabel = select.listboxLabel ?? 'Options';

  useEffect(() => {
    if (!tagKeyboardProps) {
      return;
    }

    selectTriggerRef.current?.setAttribute('tabindex', String(tagKeyboardProps.removeButtonTabIndex));
  }, [tagKeyboardProps]);

  const getOptionId = useCallback(
    (optionValue: string) => `${dropdownId}-option-${optionValues.indexOf(optionValue)}`,
    [dropdownId, optionValues],
  );

  const focusSelectedOrFirstOption = useCallback(() => {
    const selectedOption = document.getElementById(getOptionId(select.value));
    const fallbackOption = listboxRef.current?.querySelector<HTMLElement>('[role="option"]');

    (selectedOption ?? fallbackOption)?.focus();
  }, [getOptionId, select.value]);

  useEffect(() => {
    if (!isSelectOpen || !shouldFocusSelectOptionRef.current) {
      return;
    }

    shouldFocusSelectOptionRef.current = false;
    focusSelectedOrFirstOption();
  }, [focusSelectedOrFirstOption, isSelectOpen]);

  const handleSelectOption = useCallback(
    (nextValue: string) => {
      select.onChange(nextValue);
      if (isSelectOpen) {
        collapseSelect();
      }
      selectTriggerRef.current?.focus();
    },
    [collapseSelect, isSelectOpen, select],
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
    expandSelect();
  };

  const handleSelectToggle = () => {
    if (isDisabled) {
      return;
    }

    if (!isSelectOpen && isComboboxOpen) {
      onComboboxToggle?.();
    }
    toggleSelect();
  };

  const handleSelectKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      if (isSelectOpen) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      closeButtonRef.current?.focus();

      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      event.stopPropagation();

      if (!isSelectOpen) {
        if (event.key === 'ArrowDown') {
          openSelectMenu();
        }

        return;
      }

      focusSelectedOrFirstOption();
    }
  };

  const handleCloseKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      selectTriggerRef.current?.focus();
    }
  };

  const rowKeyboardProps =
    isDisabled || !tagKeyboardProps
      ? {}
      : {
          onBlurCapture: tagKeyboardProps.onBlurCapture,
          onFocusCapture: tagKeyboardProps.onFocusCapture,
          onKeyDown: tagKeyboardProps.onKeyDown,
          tabIndex: tagKeyboardProps.tabIndex,
        };

  return (
    <div
      role="row"
      aria-label={`${labelText}, ${selectedLabelText}`}
      {...(isDisabled ? { tabIndex: -1 } : rowKeyboardProps)}
    >
      <div role="gridcell" aria-colindex={1} className="d-contents">
        <UNSTABLE_SplitTag
          role="group"
          aria-label={`${labelText} filter, ${selectedLabelText}`}
          color="selected"
          {...(nestedTagSize ? { size: nestedTagSize } : {})}
          isDisabled={isDisabled}
        >
          <Tag>
            <span>{label}</span>
          </Tag>
          <Dropdown
            id={dropdownId}
            isOpen={isSelectOpen}
            onToggle={handleSelectToggle}
            placement="bottom-start"
            triggerRef={selectTriggerRef}
          >
            <DropdownTrigger elementType={Tag} aria-label={selectTriggerAriaLabel} onKeyDown={handleSelectKeyDown}>
              <span>{selectedOptionLabel}</span>
              <ControlButton
                elementType="span"
                aria-hidden="true"
                isStretched
                isSymmetrical
                {...(controlButtonSize ? { size: controlButtonSize } : {})}
              >
                <Icon name="chevron-down" />
              </ControlButton>
            </DropdownTrigger>
            <DropdownPopover aria-label={listboxLabel}>
              <Stack ref={listboxRef} role="listbox" aria-label={listboxLabel} spacing="space-300">
                {selectOptions.map((option) => {
                  const isSelected = select.value === option.value;

                  return (
                    <Item
                      {...getOptionProps(option.value)}
                      key={option.value}
                      isSelected={isSelected}
                      endSlot={isSelected ? <Icon name="check-plain" boxSize={20} /> : undefined}
                    >
                      {option.label}
                    </Item>
                  );
                })}
              </Stack>
            </DropdownPopover>
          </Dropdown>
          <Tag
            ref={closeButtonRef}
            elementType="button"
            tabIndex={tagKeyboardProps?.removeButtonTabIndex ?? -1}
            onClick={onRemove}
            onKeyDown={handleCloseKeyDown}
            isDisabled={isDisabled}
          >
            <ControlButton
              elementType="span"
              aria-hidden="true"
              isStretched
              isSymmetrical
              {...(controlButtonSize ? { size: controlButtonSize } : {})}
            >
              <Icon name="close" />
            </ControlButton>
            <VisuallyHidden>{removeButtonAriaLabel}</VisuallyHidden>
          </Tag>
        </UNSTABLE_SplitTag>
      </div>
    </div>
  );
};

UNSTABLE_ComboboxSplitTag.spiritComponent = 'UNSTABLE_ComboboxSplitTag';
UNSTABLE_ComboboxSplitTag.displayName = 'UNSTABLE_ComboboxSplitTag';

export default UNSTABLE_ComboboxSplitTag;
