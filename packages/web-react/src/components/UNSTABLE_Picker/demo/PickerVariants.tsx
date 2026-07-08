'use client';

import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import { FillVariants } from '../../../constants';
import { Box } from '../../Box';
import { Grid } from '../../Grid';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

type BackgroundVariant = {
  id: string;
  label: string;
  backgroundColor: 'primary' | 'secondary' | 'tertiary';
  theme?: 'theme-light-on-brand';
  tagProps?: {
    UNSAFE_className: string;
  };
};

const BACKGROUND_VARIANTS: BackgroundVariant[] = [
  { id: 'bg-primary', label: 'On Default Theme With Primary Background', backgroundColor: 'primary' },
  { id: 'bg-secondary', label: 'On Default Theme With Secondary Background', backgroundColor: 'secondary' },
  { id: 'bg-tertiary', label: 'On Default Theme With Tertiary Background', backgroundColor: 'tertiary' },
  {
    id: 'theme-light-on-brand-bg-primary',
    label: 'On Light On Brand Theme With Primary Background',
    backgroundColor: 'primary',
    tagProps: { UNSAFE_className: 'bg-accent-01-subtle' },
    theme: 'theme-light-on-brand',
  },
];

const PickerVariants = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
    {BACKGROUND_VARIANTS.map(({ id, label, backgroundColor, tagProps, theme }) => (
      <Box key={id} backgroundColor={backgroundColor} padding="space-800" textColor="primary" theme={theme}>
        <DocsStack>
          <h3>{label}</h3>

          <UNSTABLE_UncontrolledPicker
            id={`demo-picker-variant-fill-${id}`}
            label="Fill (default)"
            defaultSelectedKeys={['cs', 'dk']}
          >
            <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
          </UNSTABLE_UncontrolledPicker>

          <UNSTABLE_UncontrolledPicker
            id={`demo-picker-variant-outline-${id}`}
            label="Outline"
            defaultSelectedKeys={['cs', 'dk']}
            variant={FillVariants.OUTLINE}
            tagProps={tagProps}
          >
            <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
          </UNSTABLE_UncontrolledPicker>
        </DocsStack>
      </Box>
    ))}
  </Grid>
);

export default PickerVariants;
