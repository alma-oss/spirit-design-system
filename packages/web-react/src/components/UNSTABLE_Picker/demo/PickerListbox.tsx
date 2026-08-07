'use client';

import React from 'react';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerListbox = () => (
  <>
    <UNSTABLE_UncontrolledPicker id="demo-picker-listbox-empty" label="Languages" optionsRole="listbox">
      <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
    <UNSTABLE_UncontrolledPicker
      id="demo-picker-listbox-preselected"
      defaultSelectedKeys={['cs', 'dk']}
      label="Languages"
      optionsRole="listbox"
    >
      <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  </>
);

export default PickerListbox;
