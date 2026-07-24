'use client';

import React from 'react';
import { Grid } from '../../Grid';
import { UNSTABLE_Combobox } from '..';
import {
  COMBOBOX_LANGUAGE_OPTIONS_CS_EN,
  COMBOBOX_LANGUAGE_OPTIONS_CS_EN_SK,
  renderComboboxLanguageItems,
} from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxDisabled = () => {
  const emptyField = useComboboxDemoState({ options: COMBOBOX_LANGUAGE_OPTIONS_CS_EN });
  const selectedField = useComboboxDemoState({
    defaultSelectedKeys: ['cs', 'en'],
    options: COMBOBOX_LANGUAGE_OPTIONS_CS_EN_SK,
  });

  return (
    <Grid cols={{ mobile: 1, desktop: 2 }} alignmentY="top">
      <UNSTABLE_Combobox
        id="demo-combobox-disabled-empty"
        label="Languages (empty)"
        emptySelectionLabel="Languages"
        isDisabled
        isOpen={emptyField.isOpen}
        onToggle={emptyField.onToggle}
        selectedKeys={emptyField.selectedKeys}
        onSelectionChange={emptyField.onSelectionChange}
        inputValue={emptyField.inputValue}
        onInputChange={emptyField.onInputChange}
        optionKeys={emptyField.optionKeys}
        hasEmptyState={emptyField.hasEmptyState}
      >
        {renderComboboxLanguageItems(emptyField.filteredOptions)}
      </UNSTABLE_Combobox>
      <UNSTABLE_Combobox
        id="demo-combobox-disabled-selected"
        label="Languages (with selection)"
        emptySelectionLabel="Languages"
        isDisabled
        isOpen={selectedField.isOpen}
        onToggle={selectedField.onToggle}
        selectedKeys={selectedField.selectedKeys}
        onSelectionChange={selectedField.onSelectionChange}
        inputValue={selectedField.inputValue}
        onInputChange={selectedField.onInputChange}
        optionKeys={selectedField.optionKeys}
        hasEmptyState={selectedField.hasEmptyState}
      >
        {renderComboboxLanguageItems(selectedField.filteredOptions)}
      </UNSTABLE_Combobox>
    </Grid>
  );
};

export default ComboboxDisabled;
