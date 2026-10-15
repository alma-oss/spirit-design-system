import React from 'react';
import { Stack } from '../../Stack';
import Radio from '../Radio';

const RadioSizes = () => (
  <Stack>
    <Radio id="radio-size-small" label="Small" name="radioSize" size="small" />
    <Radio id="radio-size-medium" label="Medium (default)" name="radioSize" />
    <Radio id="radio-size-large" label="Large" name="radioSize" size="large" />
  </Stack>
);

export default RadioSizes;
