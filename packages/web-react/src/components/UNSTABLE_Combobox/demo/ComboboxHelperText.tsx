'use client';

import React from 'react';
import { UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxHelperText = () => {
  const state = useComboboxDemoState();

  return (
    <UNSTABLE_Combobox
      hasEmptyState={state.hasEmptyState}
      helperText="You can select multiple languages."
      id="demo-combobox-helper-text"
      inputValue={state.inputValue}
      isOpen={state.isOpen}
      label="Languages"
      onInputChange={state.onInputChange}
      onSelectionChange={state.onSelectionChange}
      onToggle={state.onToggle}
      optionKeys={state.optionKeys}
      selectedKeys={state.selectedKeys}
    >
      {renderComboboxLanguageItems(state.filteredOptions)}
    </UNSTABLE_Combobox>
  );
};

export default ComboboxHelperText;
