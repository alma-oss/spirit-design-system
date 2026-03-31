'use client';

import React from 'react';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerAggregated = () => (
  <UNSTABLE_UncontrolledPicker id="demo-picker-languages-aggregated" isAggregated label="Languages">
    <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
  </UNSTABLE_UncontrolledPicker>
);

export default PickerAggregated;
