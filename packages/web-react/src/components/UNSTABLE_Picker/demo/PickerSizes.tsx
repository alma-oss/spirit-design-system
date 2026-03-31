'use client';

import React from 'react';
import { Sizes } from '../../../constants';
import { Grid } from '../../Grid';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PICKER_SIZE_DEMOS = [
  { label: 'Small', size: Sizes.SMALL },
  { label: 'Medium (default)', size: Sizes.MEDIUM },
  { label: 'Large', size: Sizes.LARGE },
] as const;

const PickerSizes = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }}>
    {PICKER_SIZE_DEMOS.map(({ label, size }) => (
      <UNSTABLE_UncontrolledPicker
        key={size}
        id={`demo-picker-size-${size}`}
        emptySelectionLabel="Languages"
        label={label}
        size={size}
      >
        <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
      </UNSTABLE_UncontrolledPicker>
    ))}
  </Grid>
);

export default PickerSizes;
