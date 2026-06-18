import React from 'react';
import { Stack } from '../../Stack';
import Radio from '../Radio';

const RadioDisabled = () => (
  <Stack hasSpacing>
    <Radio id="radio-disabled" isDisabled label="Radio Label" name="radioDisabled" />

    <Radio
      helperText="Helper text"
      id="radio-disabled-helper-text"
      isChecked
      isDisabled
      label="Radio Label"
      name="radioDisabledHelperText"
    />
  </Stack>
);

export default RadioDisabled;
