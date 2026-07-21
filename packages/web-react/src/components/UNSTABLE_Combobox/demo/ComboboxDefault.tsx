'use client';

import React from 'react';
import { UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxDemoField = ({ id, defaultSelectedKeys = [] }: { id: string; defaultSelectedKeys?: string[] }) => {
  const state = useComboboxDemoState({ defaultSelectedKeys });

  return (
    <UNSTABLE_Combobox
      hasEmptyState={state.hasEmptyState}
      id={id}
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

const ComboboxDefault = () => (
  <>
    <ComboboxDemoField id="demo-combobox-default" />
    <ComboboxDemoField id="demo-combobox-preselected" defaultSelectedKeys={['cs', 'en', 'sk']} />
  </>
);

export default ComboboxDefault;
