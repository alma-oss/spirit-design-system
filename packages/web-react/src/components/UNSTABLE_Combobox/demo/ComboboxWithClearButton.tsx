'use client';

import React, { useRef } from 'react';
import { CloseButton } from '../../CloseButton';
import { InputAddon } from '../../InputAddon';
import { type SpiritUnstableComboboxRef, UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxWithClearButton = () => {
  const state = useComboboxDemoState();
  const comboboxRef = useRef<SpiritUnstableComboboxRef>(null);

  // Stop propagation on the addon and the button: InputContainer's own onClick
  // would otherwise reopen/refocus the popover when "Remove all" is clicked.
  const endSlot = state.selectedKeys.length > 0 && (
    <InputAddon onClick={(event) => event.stopPropagation()}>
      <CloseButton
        label="Remove all"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          // Clears the selection and returns focus to the filter input, so focus is not lost
          // when this button unmounts.
          comboboxRef.current?.removeAll();
        }}
      />
    </InputAddon>
  );

  return (
    <UNSTABLE_Combobox
      endSlot={endSlot}
      hasEmptyState={state.hasEmptyState}
      id="demo-combobox-with-clear-button"
      inputValue={state.inputValue}
      isOpen={state.isOpen}
      label="Languages with clear button"
      onInputChange={state.onInputChange}
      onSelectionChange={state.onSelectionChange}
      onToggle={state.onToggle}
      optionKeys={state.optionKeys}
      ref={comboboxRef}
      selectedKeys={state.selectedKeys}
    >
      {renderComboboxLanguageItems(state.filteredOptions)}
    </UNSTABLE_Combobox>
  );
};

export default ComboboxWithClearButton;
