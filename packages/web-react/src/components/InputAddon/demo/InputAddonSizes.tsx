import React from 'react';
import { Grid } from '../../Grid';
import { HelperText } from '../../HelperText';
import { InputContainer } from '../../InputContainer';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import InputAddon from '../InputAddon';
import PasswordToggleAddonButton from './PasswordToggleAddonButton';

const InputAddonSizes = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top">
    <Stack spacing="space-400">
      <Label htmlFor="input-addon-size-small">Small</Label>
      <InputContainer size="small">
        <input
          type="password"
          id="input-addon-size-small"
          name="inputAddonSizeSmall"
          defaultValue="password"
          aria-describedby="input-addon-size-small-helper-text"
        />
        <InputAddon>
          <PasswordToggleAddonButton size="small" />
        </InputAddon>
      </InputContainer>
      <HelperText id="input-addon-size-small-helper-text" helperText="Helper text" />
    </Stack>
    <Stack spacing="space-400">
      <Label htmlFor="input-addon-size-medium">Medium (default)</Label>
      <InputContainer size="medium">
        <input
          type="password"
          id="input-addon-size-medium"
          name="inputAddonSizeMedium"
          defaultValue="password"
          aria-describedby="input-addon-size-medium-helper-text"
        />
        <InputAddon>
          <PasswordToggleAddonButton size="medium" />
        </InputAddon>
      </InputContainer>
      <HelperText id="input-addon-size-medium-helper-text" helperText="Helper text" />
    </Stack>
    <Stack spacing="space-400">
      <Label htmlFor="input-addon-size-large">Large</Label>
      <InputContainer size="large">
        <input
          type="password"
          id="input-addon-size-large"
          name="inputAddonSizeLarge"
          defaultValue="password"
          aria-describedby="input-addon-size-large-helper-text"
        />
        <InputAddon>
          <PasswordToggleAddonButton size="large" />
        </InputAddon>
      </InputContainer>
      <HelperText id="input-addon-size-large-helper-text" helperText="Helper text" />
    </Stack>
  </Grid>
);

export default InputAddonSizes;
