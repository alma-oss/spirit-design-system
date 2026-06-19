import React from 'react';
import { ContextPropsProvider } from '../../../context';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import InputContainer from '../InputContainer';

const InputContainerDisabled = () => (
  <Stack spacing="space-400">
    <ContextPropsProvider value={{ isDisabled: true }}>
      <Label htmlFor="input-container-disabled">Label</Label>
      <InputContainer>
        <input type="text" id="input-container-disabled" name="disabled" placeholder="Placeholder" disabled />
      </InputContainer>
    </ContextPropsProvider>
  </Stack>
);

export default InputContainerDisabled;
