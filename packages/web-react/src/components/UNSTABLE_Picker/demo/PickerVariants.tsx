'use client';

import React from 'react';
import { FillVariants } from '../../../constants';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerVariants = () => (
  <>
    <UNSTABLE_UncontrolledPicker id="demo-picker-variant-fill" label="Languages" variant={FillVariants.FILL}>
      <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>

    <UNSTABLE_UncontrolledPicker id="demo-picker-variant-outline" label="Languages" variant={FillVariants.OUTLINE}>
      <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  </>
);

export default PickerVariants;
