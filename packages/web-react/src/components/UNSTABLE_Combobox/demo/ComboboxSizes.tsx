'use client';

import React from 'react';
import { Sizes } from '../../../constants';
import { Grid } from '../../Grid';
import { UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const COMBOBOX_SIZE_DEMOS = [
  { label: 'Small', size: Sizes.SMALL },
  { label: 'Medium', size: Sizes.MEDIUM },
  { label: 'Large', size: Sizes.LARGE },
] as const;

const SizeField = ({
  id,
  label,
  size,
}: {
  id: string;
  label: string;
  size: (typeof COMBOBOX_SIZE_DEMOS)[number]['size'];
}) => {
  const state = useComboboxDemoState();

  return (
    <UNSTABLE_Combobox
      hasEmptyState={state.hasEmptyState}
      id={id}
      inputValue={state.inputValue}
      isOpen={state.isOpen}
      label={label}
      onInputChange={state.onInputChange}
      onSelectionChange={state.onSelectionChange}
      onToggle={state.onToggle}
      optionKeys={state.optionKeys}
      selectedKeys={state.selectedKeys}
      size={size}
    >
      {renderComboboxLanguageItems(state.filteredOptions)}
    </UNSTABLE_Combobox>
  );
};

const ComboboxSizes = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top">
    {COMBOBOX_SIZE_DEMOS.map(({ label, size }) => (
      <SizeField key={size} id={`demo-combobox-size-${size}`} label={label} size={size} />
    ))}
  </Grid>
);

export default ComboboxSizes;
