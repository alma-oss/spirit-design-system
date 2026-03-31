'use client';

import React from 'react';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerDefault = () => (
  <>
    <UNSTABLE_UncontrolledPicker id="demo-picker-languages-empty" label="Languages">
      <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
    <UNSTABLE_UncontrolledPicker
      id="demo-picker-languages-preselected"
      defaultSelectedKeys={['cs', 'dk']}
      label="Languages"
    >
      <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  </>
);

export default PickerDefault;
