'use client';

import React, { type KeyboardEvent, type MouseEvent, type ReactNode, type RefObject } from 'react';
import type { SelectionGridRowProps } from '../../hooks';
import { replaceTranslationParams } from '../../translations';
import type { SizesDictionaryType, StyleProps } from '../../types';
import { CloseButton } from '../CloseButton';
import { InputAddon } from '../InputAddon';
import { InputContainer } from '../InputContainer';
import { VisuallyHidden } from '../VisuallyHidden';
import { COMBOBOX_CLEAR_CONTROL_BUTTON_SIZE_MAP } from './constants';
import type { ComboboxOptionsRole, UnstableComboboxRenderTagsOptions } from './types';
import UNSTABLE_ComboboxSelection from './UNSTABLE_ComboboxSelection';
import UNSTABLE_ComboboxTag from './UNSTABLE_ComboboxTag';
import type { ComboboxSelectedItem } from './useComboboxItems';

export interface ComboboxInputProps {
  activeDescendantId?: string;
  addMoreDescriptionText: string;
  addMoreHelperId: string;
  describedByIds: string;
  getKeyboardGridRowProps: (index: number) => SelectionGridRowProps;
  handleGroupClick: (event: MouseEvent<HTMLElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasClearButton: boolean;
  inputAriaLabel?: string;
  inputClassName: string;
  inputId: string;
  inputPlaceholder: string;
  inputRef: RefObject<HTMLInputElement>;
  inputValue: string;
  isDisabled: boolean;
  isOpen: boolean;
  isRequired: boolean;
  label: string;
  labelId: string;
  listboxId: string;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  open: () => void;
  optionsRole: ComboboxOptionsRole | null;
  removeAll: () => void;
  removeAllLabel: string;
  removeItem: (key: string) => void;
  removeItemLabel?: string;
  removeTagAtIndex: (index: number) => void;
  renderTags?: (options: UnstableComboboxRenderTagsOptions) => ReactNode;
  selectedItems: ComboboxSelectedItem[];
  selectedKeysCount: number;
  selectionAriaLabel: string;
  selectionGridRef: RefObject<HTMLDivElement>;
  selectionId: string;
  shouldRenderOptions: boolean;
  showAddMore: boolean;
  size: NonNullable<SizesDictionaryType>;
  tagProps?: StyleProps;
}

/**
 * Combobox field: selection tags, filter input, and optional clear-all control.
 *
 * @param props Combobox input field props
 */
const ComboboxInput = (props: ComboboxInputProps) => {
  const {
    activeDescendantId,
    addMoreDescriptionText,
    addMoreHelperId,
    describedByIds,
    getKeyboardGridRowProps,
    handleGroupClick,
    handleInputChange,
    hasClearButton,
    inputAriaLabel,
    inputClassName,
    inputId,
    inputPlaceholder,
    inputRef,
    inputValue,
    isDisabled,
    isOpen,
    isRequired,
    label,
    labelId,
    listboxId,
    onInputKeyDown,
    open,
    optionsRole,
    removeAll,
    removeAllLabel,
    removeItem,
    removeItemLabel,
    removeTagAtIndex,
    renderTags,
    selectedItems,
    selectedKeysCount,
    selectionAriaLabel,
    selectionGridRef,
    selectionId,
    shouldRenderOptions,
    showAddMore,
    size,
    tagProps,
  } = props;

  const selectionContent = (() => {
    if (!selectedItems.length) {
      return null;
    }

    if (renderTags) {
      return renderTags({
        getKeyboardGridRowProps,
        onRemove: removeItem,
        removeTagAtIndex,
      });
    }

    return selectedItems.map((item, index) => (
      <UNSTABLE_ComboboxTag
        {...tagProps}
        key={item.value}
        tagKeyboardProps={getKeyboardGridRowProps(index)}
        isDisabled={isDisabled}
        label={item.label}
        onRemove={() => removeTagAtIndex(index)}
        {...(removeItemLabel
          ? {
              removeLabel: replaceTranslationParams(removeItemLabel, { itemLabel: item.label }),
            }
          : {})}
      />
    ));
  })();

  return (
    <InputContainer role="group" aria-label={label} onClick={handleGroupClick}>
      <UNSTABLE_ComboboxSelection isDisabled={isDisabled}>
        <div
          ref={selectionGridRef}
          role={selectedItems.length ? 'grid' : 'group'}
          id={selectionId}
          className="d-contents"
          aria-label={replaceTranslationParams(selectionAriaLabel, { label })}
          aria-live="off"
          aria-atomic={false}
          aria-relevant="additions"
        >
          {selectionContent}
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          className={inputClassName}
          disabled={isDisabled}
          value={inputValue}
          placeholder={inputPlaceholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={shouldRenderOptions ? listboxId : undefined}
          aria-expanded={isOpen}
          aria-haspopup={optionsRole ?? undefined}
          aria-labelledby={labelId}
          aria-required={isRequired || undefined}
          {...(inputAriaLabel ? { 'aria-label': inputAriaLabel } : {})}
          {...(describedByIds ? { 'aria-describedby': describedByIds } : {})}
          {...(activeDescendantId ? { 'aria-activedescendant': activeDescendantId } : {})}
          onClick={open}
          onChange={handleInputChange}
          onKeyDown={onInputKeyDown}
        />
        <VisuallyHidden id={addMoreHelperId} {...(!showAddMore ? { hidden: true } : {})}>
          {replaceTranslationParams(addMoreDescriptionText, { label })}
        </VisuallyHidden>
      </UNSTABLE_ComboboxSelection>
      {hasClearButton && (
        <InputAddon
          onClick={(event: MouseEvent<HTMLElement>) => event.stopPropagation()}
          {...(selectedKeysCount === 0 ? { hidden: true, UNSAFE_className: 'd-none' } : {})}
        >
          <CloseButton
            label={removeAllLabel}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              event.stopPropagation();
              removeAll();
            }}
            size={COMBOBOX_CLEAR_CONTROL_BUTTON_SIZE_MAP[size]}
            isDisabled={isDisabled}
          />
        </InputAddon>
      )}
    </InputContainer>
  );
};

export default ComboboxInput;
