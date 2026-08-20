'use client';

import React from 'react';
import { ControlButton } from '../ControlButton';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../Dropdown';
import { Icon } from '../Icon';
import { Item } from '../Item';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { Tag } from '../Tag';
import UNSTABLE_SplitTag from '../UNSTABLE_SplitTag/UNSTABLE_SplitTag';
import { VisuallyHidden } from '../VisuallyHidden';
import type { SpiritUnstableComboboxSplitTagProps } from './types';
import { useComboboxSplitTag } from './useComboboxSplitTag';

/**
 * Combobox selection row with a SplitTag shell: label + nested select + remove.
 * Pass `tagKeyboardProps` from `renderTags` like `UNSTABLE_ComboboxTag`.
 * Nested Tag / ControlButton size and `isDisabled` come from Combobox `ContextPropsProvider`
 * via `UNSTABLE_SplitTag` (inherits `splitTag` context size).
 * Nested select open state is controlled via `select.isOpen` / `select.onToggle`
 * (typically `useDisclosureState` in the consumer). Logic lives in `useComboboxSplitTag`.
 *
 * @param props Combobox split-tag props
 */
const UNSTABLE_ComboboxSplitTag = (props: SpiritUnstableComboboxSplitTagProps) => {
  const {
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
  } = useComboboxSplitTag(props);

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
            <DropdownTrigger
              elementType={Tag}
              aria-label={selectTriggerAriaLabel}
              tabIndex={secondaryControlTabIndex}
              onKeyDown={handleSelectKeyDown}
            >
              <span>{selectedOptionLabel}</span>
              <ControlButton elementType="span" aria-hidden="true" isStretched isSymmetrical>
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
                      endSlot={isSelected ? <Icon name="check-plain" color="selected" boxSize={20} /> : undefined}
                    >
                      <Label>{option.label}</Label>
                    </Item>
                  );
                })}
              </Stack>
            </DropdownPopover>
          </Dropdown>
          <Tag
            ref={closeButtonRef}
            elementType="button"
            tabIndex={secondaryControlTabIndex}
            onClick={onRemove}
            onKeyDown={handleCloseKeyDown}
            isDisabled={isDisabled}
          >
            <ControlButton elementType="span" aria-hidden="true" isStretched isSymmetrical>
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
