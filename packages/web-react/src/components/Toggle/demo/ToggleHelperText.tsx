import React from 'react';
import { Stack } from '../../Stack';
import Toggle from '../Toggle';

const ToggleHelperText = () => (
  <Stack hasSpacing>
    <Toggle id="toggle-helper-text" label="Toggle Label" helperText="Helper text" name="default" />
    <Toggle id="toggle-helper-text-checked" label="Toggle Label" helperText="Helper text" name="default" isChecked />
  </Stack>
);

export default ToggleHelperText;
