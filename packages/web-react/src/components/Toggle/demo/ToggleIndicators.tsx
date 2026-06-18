import React from 'react';
import { Stack } from '../../Stack';
import Toggle from '../Toggle';

const ToggleIndicators = () => (
  <Stack hasSpacing>
    <Toggle id="toggle-indicators" label="Toggle Label" name="default" hasIndicators />
    <Toggle id="toggle-indicators-checked" label="Toggle Label" name="default" isChecked hasIndicators />
  </Stack>
);

export default ToggleIndicators;
