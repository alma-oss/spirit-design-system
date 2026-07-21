'use client';

import React from 'react';
import { Grid } from '../../Grid';
import { UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
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
      validationState={validationState}
      validationText={validationText}
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
