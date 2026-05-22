'use client';

import React from 'react';
import { Box } from '../../Box';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerThemes = () => (
  <Box theme="theme-light-on-brand" backgroundColor="primary" padding="space-800" borderRadius="300">
    <UNSTABLE_UncontrolledPicker
      id="demo-picker-themes"
      defaultSelectedKeys={['cs', 'dk']}
      label="Languages"
      theme="theme-light-default"
      dropdownProps={{ fullWidthMode: 'all' }}
      labelProps={{ theme: 'theme-light-on-brand' }}
    >
      <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  </Box>
);

export default PickerThemes;
