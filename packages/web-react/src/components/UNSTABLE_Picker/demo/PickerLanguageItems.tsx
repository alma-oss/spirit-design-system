'use client';

import React from 'react';
import { UNSTABLE_PickerItem } from '..';

const PICKER_LANGUAGE_ITEMS = [
  { value: 'cs', label: 'Czech' },
  { value: 'dk', label: 'Danish' },
  { value: 'kl', label: 'Greenlandic' },
] as const;

export const renderPickerLanguageItems = () => (
  <>
    {PICKER_LANGUAGE_ITEMS.map(({ value, label }) => (
      <UNSTABLE_PickerItem key={value} value={value}>
        {label}
      </UNSTABLE_PickerItem>
    ))}
  </>
);
