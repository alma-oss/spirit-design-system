import React from 'react';
import { Box } from '../../Box';
import { UNSTABLE_PickerGroup, UNSTABLE_PickerItem, UNSTABLE_UncontrolledPicker } from '..';

const LONG_TEXT_OPTIONS = [
  {
    value: 'long-multi-word',
    label: 'International business administration and intercultural communication studies',
  },
  {
    value: 'longtextwithoutspaces',
    label: 'longtextwithoutspaceslongtextwithoutspaceslongtextwithoutspaces',
  },
] as const;

const PickerLongText = () => (
  <Box UNSAFE_style={{ maxWidth: '16rem' }}>
    <UNSTABLE_UncontrolledPicker
      id="demo-picker-long-text"
      defaultSelectedKeys={LONG_TEXT_OPTIONS.map((option) => option.value)}
      dropdownProps={{ fullWidthMode: 'mobile-only' }}
      label="Skills"
    >
      <UNSTABLE_PickerGroup label="Skills">
        {LONG_TEXT_OPTIONS.map(({ value, label }) => (
          <UNSTABLE_PickerItem key={value} value={value}>
            <span className="text-word-break-long-words">{label}</span>
          </UNSTABLE_PickerItem>
        ))}
      </UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  </Box>
);

export default PickerLongText;
