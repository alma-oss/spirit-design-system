'use client';

import React from 'react';
import { ContextualHelp, UNSTABLE_Combobox } from '../..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxContextualHelp = () => {
  const state = useComboboxDemoState();

  return (
    <UNSTABLE_Combobox
      contextualHelp={
        <ContextualHelp id="demo-combobox-contextual-help-tooltip" label="More information about Languages">
          Pick every language you can use at work, not only your native one.
        </ContextualHelp>
      }
      hasEmptyState={state.hasEmptyState}
      id="demo-combobox-contextual-help"
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

export default ComboboxContextualHelp;
