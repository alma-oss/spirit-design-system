'use client';

import React from 'react';
import { UNSTABLE_Combobox } from '..';
import { COMBOBOX_LANGUAGE_OPTIONS_CS_EN_SK, renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxHelperText = () => {
  const state = useComboboxDemoState({ options: COMBOBOX_LANGUAGE_OPTIONS_CS_EN_SK });

  return (
    <UNSTABLE_Combobox
      id="demo-combobox-helper-text"
      label="Languages"
      helperText="You can select multiple languages."
      isOpen={state.isOpen}
      onToggle={state.onToggle}
      selectedKeys={state.selectedKeys}
      onSelectionChange={state.onSelectionChange}
      inputValue={state.inputValue}
      onInputChange={state.onInputChange}
      optionKeys={state.optionKeys}
      hasEmptyState={state.hasEmptyState}
    >
      {renderComboboxLanguageItems(state.filteredOptions)}
    </UNSTABLE_Combobox>
  );
};

export default ComboboxHelperText;
