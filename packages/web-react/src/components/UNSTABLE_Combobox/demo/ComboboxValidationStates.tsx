'use client';

import React from 'react';
import { Grid } from '../../Grid';
import { UNSTABLE_Combobox } from '..';
import { COMBOBOX_LANGUAGE_OPTIONS_CS_EN, renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ValidationField = ({
  id,
  validationState,
  validationText,
  defaultSelectedKeys = [],
}: {
  id: string;
  validationState: 'success' | 'warning' | 'danger';
  validationText: string;
  defaultSelectedKeys?: string[];
}) => {
  const state = useComboboxDemoState({ defaultSelectedKeys, options: COMBOBOX_LANGUAGE_OPTIONS_CS_EN });

  return (
    <UNSTABLE_Combobox
      id={id}
      label="Languages"
      validationState={validationState}
      validationText={validationText}
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

const ComboboxValidationStates = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top">
    <ValidationField
      id="demo-combobox-validation-danger"
      validationState="danger"
      validationText="Please select at least one language."
    />
    <ValidationField
      id="demo-combobox-validation-warning"
      validationState="warning"
      validationText="Consider selecting more languages."
      defaultSelectedKeys={['cs']}
    />
    <ValidationField
      id="demo-combobox-validation-success"
      validationState="success"
      validationText="Languages selected successfully."
      defaultSelectedKeys={['cs', 'en']}
    />
  </Grid>
);

export default ComboboxValidationStates;
