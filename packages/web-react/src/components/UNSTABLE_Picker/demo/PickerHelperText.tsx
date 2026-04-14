'use client';

import React, { useRef } from 'react';
import type { SpiritUnstablePickerRef } from '../types';
import { UNSTABLE_PickerGroup, UNSTABLE_PickerItem, UNSTABLE_UncontrolledPicker } from '..';

const HELPER_TEXT_LABEL = 'Languages';

const HELPER_TEXT_ITEMS: { value: string; label: string; helperText?: string }[] = [
  { value: 'cs', label: 'Czech', helperText: 'Select this when the listing has no language tag.' },
  { value: 'dk', label: 'Danish' },
  { value: 'kl', label: 'Greenlandic' },
];

const PickerHelperText = () => {
  const pickerRef = useRef<SpiritUnstablePickerRef>(null);

  return (
    <UNSTABLE_UncontrolledPicker
      ref={pickerRef}
      id="demo-picker-helper-text"
      helperText="Select one or more languages"
      label={HELPER_TEXT_LABEL}
    >
      <UNSTABLE_PickerGroup label={HELPER_TEXT_LABEL} UNSAFE_style={{ width: '300px' }}>
        {HELPER_TEXT_ITEMS.map((item) => (
          <UNSTABLE_PickerItem key={item.value} value={item.value} helperText={item.helperText}>
            {item.label}
          </UNSTABLE_PickerItem>
        ))}
      </UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  );
};

export default PickerHelperText;
