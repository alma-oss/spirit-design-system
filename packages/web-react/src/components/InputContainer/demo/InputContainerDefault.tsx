import React from 'react';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import InputContainer from '../InputContainer';

const InputContainerDefault = () => (
  <Stack spacing="space-400">
    <Label htmlFor="input-container-default">Label</Label>
    <InputContainer>
      <input type="text" id="input-container-default" name="default" placeholder="Placeholder" />
    </InputContainer>
  </Stack>
);

export default InputContainerDefault;
