import React from 'react';
import { Box } from '../../Box';
import { DEFAULT_POPOVER_PROPS } from '../constants';
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
      label="Skills"
      popoverProps={{ ...DEFAULT_POPOVER_PROPS, UNSAFE_style: { width: '15rem' } }}
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
