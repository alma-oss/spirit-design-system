'use client';

import React from 'react';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerListboxSingle = () => (
  <UNSTABLE_UncontrolledPicker
    id="demo-picker-listbox-single"
    defaultSelectedKeys={['cs']}
    label="Language"
    optionsRole="listbox"
    selectionMode="single"
  >
    <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
  </UNSTABLE_UncontrolledPicker>
);

export default PickerListboxSingle;
