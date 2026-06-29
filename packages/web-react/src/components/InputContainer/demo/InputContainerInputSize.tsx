import React from 'react';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import InputContainer from '../InputContainer';

const InputContainerInputSize = () => (
  <Stack spacing="space-400">
    <Label htmlFor="input-container-input-size">MMYY</Label>
    <InputContainer>
      <input type="text" size={4} id="input-container-input-size" name="inputSize" placeholder="0126" />
    </InputContainer>
  </Stack>
);

export default InputContainerInputSize;
