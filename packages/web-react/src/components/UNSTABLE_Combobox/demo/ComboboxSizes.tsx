'use client';

import React from 'react';
import { Sizes } from '../../../constants';
import { Grid } from '../../Grid';
import { UNSTABLE_Combobox } from '..';
import { COMBOBOX_LANGUAGE_OPTIONS_CS_EN_SK, renderComboboxLanguageItems } from './ComboboxLanguageItems';
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
  const state = useComboboxDemoState({ options: COMBOBOX_LANGUAGE_OPTIONS_CS_EN_SK });

  return (
    <UNSTABLE_Combobox
      id={id}
      label={label}
      size={size}
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

const ComboboxSizes = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top">
    {COMBOBOX_SIZE_DEMOS.map(({ label, size }) => (
      <SizeField key={size} id={`demo-combobox-size-${size}`} label={label} size={size} />
    ))}
  </Grid>
);

export default ComboboxSizes;
