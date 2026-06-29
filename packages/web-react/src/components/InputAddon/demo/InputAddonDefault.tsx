import React from 'react';
import { InputContainer } from '../../InputContainer';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import InputAddon from '../InputAddon';
import PasswordToggleAddonButton from './PasswordToggleAddonButton';

const InputAddonDefault = () => (
  <Stack spacing="space-400">
    <Label htmlFor="input-addon-default">Password Toggle</Label>
    <InputContainer size="medium">
      <input
        type="password"
        id="input-addon-default"
        name="inputAddonDefault"
        placeholder="Password must be at least 6 characters long"
      />
      <InputAddon>
        <PasswordToggleAddonButton size="medium" />
      </InputAddon>
    </InputContainer>
  </Stack>
);

export default InputAddonDefault;
