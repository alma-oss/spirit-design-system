'use client';

import React from 'react';
import { Icon } from '../../Icon';
import { InputAddon } from '../../InputAddon';
import { VisuallyHidden } from '../../VisuallyHidden';
import { UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxAddons = () => {
  const state = useComboboxDemoState();

  return (
    <UNSTABLE_Combobox
      hasEmptyState={state.hasEmptyState}
      id="demo-combobox-addons"
      inputValue={state.inputValue}
      isOpen={state.isOpen}
      label="Languages"
      onInputChange={state.onInputChange}
      onSelectionChange={state.onSelectionChange}
      onToggle={state.onToggle}
      optionKeys={state.optionKeys}
      selectedKeys={state.selectedKeys}
      startSlot={
        <InputAddon>
          <Icon name="search" />
          <VisuallyHidden>Search languages</VisuallyHidden>
        </InputAddon>
      }
    >
      {renderComboboxLanguageItems(state.filteredOptions)}
    </UNSTABLE_Combobox>
  );
};

export default ComboboxAddons;
