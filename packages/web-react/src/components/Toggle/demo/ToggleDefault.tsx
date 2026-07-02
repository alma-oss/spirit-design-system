import React from 'react';
import { Stack } from '../../Stack';
import Toggle from '../Toggle';

const ToggleDefault = () => (
  <Stack>
    <Toggle id="toggle-default" label="Toggle Label" name="default" />
    <Toggle id="toggle-default-checked" label="Toggle Label" name="default" isChecked />
  </Stack>
);

export default ToggleDefault;
