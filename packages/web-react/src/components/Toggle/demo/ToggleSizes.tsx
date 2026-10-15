import React from 'react';
import { Stack } from '../../Stack';
import Toggle from '../Toggle';

const ToggleSizes = () => (
  <Stack>
    <Toggle id="toggle-size-small" label="Small" name="toggleSizeSmall" size="small" />
    <Toggle id="toggle-size-medium" label="Medium (default)" name="toggleSizeMedium" />
    <Toggle id="toggle-size-large" label="Large" name="toggleSizeLarge" size="large" />
  </Stack>
);

export default ToggleSizes;
