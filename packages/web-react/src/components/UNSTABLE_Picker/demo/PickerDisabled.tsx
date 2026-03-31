'use client';

import React from 'react';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerDisabled = () => (
  <>
    <UNSTABLE_UncontrolledPicker id="demo-picker-disabled-empty" isDisabled label="Languages">
      <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
    <UNSTABLE_UncontrolledPicker
      id="demo-picker-disabled-preselected"
      defaultSelectedKeys={['cs', 'dk']}
      isDisabled
      label="Languages"
    >
      <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  </>
);

export default PickerDisabled;
