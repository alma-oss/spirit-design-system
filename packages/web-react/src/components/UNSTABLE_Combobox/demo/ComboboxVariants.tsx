'use client';

import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import { FillVariants } from '../../../constants';
import { Box } from '../../Box';
import { Grid } from '../../Grid';
import { UNSTABLE_Combobox } from '..';
import { COMBOBOX_LANGUAGE_OPTIONS_CS_EN_SK, renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

type BackgroundVariant = {
  id: string;
  label: string;
  backgroundColor: 'primary' | 'secondary' | 'tertiary';
  theme?: 'theme-light-on-brand';
};

const BACKGROUND_VARIANTS: BackgroundVariant[] = [
  { id: 'bg-primary', label: 'On Default Theme With Primary Background', backgroundColor: 'primary' },
  { id: 'bg-secondary', label: 'On Default Theme With Secondary Background', backgroundColor: 'secondary' },
  { id: 'bg-tertiary', label: 'On Default Theme With Tertiary Background', backgroundColor: 'tertiary' },
  {
    id: 'theme-light-on-brand-bg-primary',
    label: 'On Light On Brand Theme With Primary Background',
    backgroundColor: 'primary',
    theme: 'theme-light-on-brand',
  },
];

const VariantField = ({ id, label, variant }: { id: string; label: string; variant: 'fill' | 'outline' }) => {
  const state = useComboboxDemoState({ options: COMBOBOX_LANGUAGE_OPTIONS_CS_EN_SK });

  return (
    <UNSTABLE_Combobox
      id={id}
      label={label}
      emptySelectionLabel="Languages"
      variant={variant}
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

const ComboboxVariants = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
    {BACKGROUND_VARIANTS.map(({ id, label, backgroundColor, theme }) => (
      <Box key={id} backgroundColor={backgroundColor} padding="space-800" textColor="primary" theme={theme}>
        <DocsStack>
          <h3>{label}</h3>
          <VariantField id={`demo-combobox-variant-fill-${id}`} label="Fill (default)" variant={FillVariants.FILL} />
          <VariantField id={`demo-combobox-variant-outline-${id}`} label="Outline" variant={FillVariants.OUTLINE} />
        </DocsStack>
      </Box>
    ))}
  </Grid>
);

export default ComboboxVariants;
