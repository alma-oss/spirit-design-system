'use client';

import React from 'react';
import { UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxDemoField = ({
  id,
  defaultSelectedKeys = [],
}: {
  id: string;
  defaultSelectedKeys?: string[];
}) => {
  const state = useComboboxDemoState({ defaultSelectedKeys });

  return (
    <UNSTABLE_Combobox
      id={id}
      label="Languages"
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

const ComboboxDefault = () => (
  <>
    <ComboboxDemoField id="demo-combobox-default" />
    <ComboboxDemoField id="demo-combobox-preselected" defaultSelectedKeys={['cs', 'en', 'sk']} />
  </>
);

export default ComboboxDefault;
