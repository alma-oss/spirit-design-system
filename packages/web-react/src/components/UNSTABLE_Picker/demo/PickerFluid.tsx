'use client';

import React from 'react';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerFluid = () => (
  <UNSTABLE_UncontrolledPicker id="demo-picker-fluid" isFluid label="Languages">
    <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
  </UNSTABLE_UncontrolledPicker>
);

export default PickerFluid;
