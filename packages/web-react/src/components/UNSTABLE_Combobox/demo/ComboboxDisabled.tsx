'use client';

import React from 'react';
import { Grid } from '../../Grid';
import { UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxDisabled = () => {
  const emptyField = useComboboxDemoState();
  const selectedField = useComboboxDemoState({ defaultSelectedKeys: ['cs', 'en'] });

  return (
    <Grid cols={{ mobile: 1, desktop: 2 }} alignmentY="top">
      <UNSTABLE_Combobox
        emptySelectionLabel="Languages"
        hasEmptyState={emptyField.hasEmptyState}
        id="demo-combobox-disabled-empty"
        inputValue={emptyField.inputValue}
        isDisabled
        isOpen={emptyField.isOpen}
        label="Languages (empty)"
        onInputChange={emptyField.onInputChange}
        onSelectionChange={emptyField.onSelectionChange}
        onToggle={emptyField.onToggle}
        optionKeys={emptyField.optionKeys}
        selectedKeys={emptyField.selectedKeys}
      >
        {renderComboboxLanguageItems(emptyField.filteredOptions)}
      </UNSTABLE_Combobox>
      <UNSTABLE_Combobox
        emptySelectionLabel="Languages"
        hasEmptyState={selectedField.hasEmptyState}
        id="demo-combobox-disabled-selected"
        inputValue={selectedField.inputValue}
        isDisabled
        isOpen={selectedField.isOpen}
        label="Languages (with selection)"
        onInputChange={selectedField.onInputChange}
        onSelectionChange={selectedField.onSelectionChange}
        onToggle={selectedField.onToggle}
        optionKeys={selectedField.optionKeys}
        selectedKeys={selectedField.selectedKeys}
      >
        {renderComboboxLanguageItems(selectedField.filteredOptions)}
      </UNSTABLE_Combobox>
    </Grid>
  );
};

export default ComboboxDisabled;
