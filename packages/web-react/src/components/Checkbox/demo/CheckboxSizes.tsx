import React from 'react';
import { Stack } from '../../Stack';
import Checkbox from '../Checkbox';

const CheckboxSizes = () => (
  <Stack>
    <Checkbox id="checkbox-size-small" label="Small" name="checkboxSizeSmall" size="small" />
    <Checkbox id="checkbox-size-medium" label="Medium (default)" name="checkboxSizeMedium" />
    <Checkbox id="checkbox-size-large" label="Large" name="checkboxSizeLarge" size="large" />
  </Stack>
);

export default CheckboxSizes;
