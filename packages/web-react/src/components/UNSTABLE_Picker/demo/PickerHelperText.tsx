'use client';

import React from 'react';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerHelperText = () => (
  <UNSTABLE_UncontrolledPicker id="demo-picker-helper-text" helperText="Select one or more languages" label="Languages">
    <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
  </UNSTABLE_UncontrolledPicker>
);

export default PickerHelperText;
