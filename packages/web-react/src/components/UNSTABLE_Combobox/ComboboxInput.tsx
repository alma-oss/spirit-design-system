'use client';

import React, { type KeyboardEvent, type MouseEvent, type ReactNode, type RefObject } from 'react';
import type { SelectionGridRowProps } from '../../hooks';
import { replaceTranslationParams } from '../../translations';
import type { StyleProps } from '../../types';
import { InputContainer } from '../InputContainer';
import { VisuallyHidden } from '../VisuallyHidden';
import type { ComboboxOptionsRole, UnstableComboboxRenderTagsOptions } from './types';
import UNSTABLE_ComboboxSelection from './UNSTABLE_ComboboxSelection';
import UNSTABLE_ComboboxTag from './UNSTABLE_ComboboxTag';
import type { ComboboxSelectedItem } from './useComboboxItems';

export interface ComboboxInputProps {
  activeDescendantId?: string;
  addMoreDescriptionText: string;
  addMoreHelperId: string;
  describedByIds: string;
  endSlot?: ReactNode;
  getKeyboardGridRowProps: (index: number) => SelectionGridRowProps;
  handleGroupClick: (event: MouseEvent<HTMLElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  removeItem: (key: string) => void;
  removeItemLabel?: string;
  removeTagAtIndex: (index: number) => void;
  renderTags?: (options: UnstableComboboxRenderTagsOptions) => ReactNode;
  selectedItems: ComboboxSelectedItem[];
  selectionAriaLabel: string;
  selectionGridRef: RefObject<HTMLDivElement>;
  selectionId: string;
  shouldRenderOptions: boolean;
  showAddMore: boolean;
  startSlot?: ReactNode;
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
    endSlot,
    getKeyboardGridRowProps,
    handleGroupClick,
    handleInputChange,
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
    removeItem,
    removeItemLabel,
    removeTagAtIndex,
    renderTags,
    selectedItems,
    selectionAriaLabel,
    selectionGridRef,
    selectionId,
    shouldRenderOptions,
    showAddMore,
    startSlot,
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
        selectedItems,
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
      {startSlot}
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
      {endSlot}
    </InputContainer>
  );
};

export default ComboboxInput;
