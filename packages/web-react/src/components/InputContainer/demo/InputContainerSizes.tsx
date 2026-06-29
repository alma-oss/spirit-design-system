import React from 'react';
import { PropsProvider } from '../../../context';
import { Grid } from '../../Grid';
import { HelperText } from '../../HelperText';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import InputContainer from '../InputContainer';

const InputContainerSizes = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top">
    <Stack spacing="space-400">
      <PropsProvider value={{ size: 'small' }}>
        <Label htmlFor="input-container-size-small">Small</Label>
        <InputContainer>
          <input type="text" id="input-container-size-small" name="sizeSmall" placeholder="Placeholder" />
        </InputContainer>
        <HelperText id="input-container-size-small-helper-text" helperText="Helper text" />
      </PropsProvider>
    </Stack>
    <Stack spacing="space-400">
      <Label htmlFor="input-container-size-medium">Medium (default)</Label>
      <InputContainer>
        <input type="text" id="input-container-size-medium" name="sizeMedium" placeholder="Placeholder" />
      </InputContainer>
      <HelperText id="input-container-size-medium-helper-text" helperText="Helper text" />
    </Stack>
    <Stack spacing="space-400">
      <PropsProvider value={{ size: 'large' }}>
        <Label htmlFor="input-container-size-large">Large</Label>
        <InputContainer>
          <input type="text" id="input-container-size-large" name="sizeLarge" placeholder="Placeholder" />
        </InputContainer>
        <HelperText id="input-container-size-large-helper-text" helperText="Helper text" />
      </PropsProvider>
    </Stack>
  </Grid>
);

export default InputContainerSizes;
