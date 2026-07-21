import React from 'react';
import { InputContainer } from '../../InputContainer';
import { Stack } from '../../Stack';
import Label from '../Label';

const LabelSizes = () => (
  <>
    <Stack spacing="space-400">
      <Label htmlFor="label-size-xsmall" size="xsmall">
        XSmall
      </Label>
      <InputContainer>
        <input type="text" id="label-size-xsmall" name="label-size-xsmall" placeholder="Placeholder" />
      </InputContainer>
    </Stack>
    <Stack spacing="space-400">
      <Label htmlFor="label-size-small" size="small">
        Small
      </Label>
      <InputContainer>
        <input type="text" id="label-size-small" name="label-size-small" placeholder="Placeholder" />
      </InputContainer>
    </Stack>
    <Stack spacing="space-400">
      <Label htmlFor="label-size-medium">Medium (default)</Label>
      <InputContainer>
        <input type="text" id="label-size-medium" name="label-size-medium" placeholder="Placeholder" />
      </InputContainer>
    </Stack>
    <Stack spacing="space-400">
      <Label htmlFor="label-size-large" size="large">
        Large
      </Label>
      <InputContainer>
        <input type="text" id="label-size-large" name="label-size-large" placeholder="Placeholder" />
      </InputContainer>
    </Stack>
    <Stack spacing="space-400">
      <Label htmlFor="label-size-xlarge" size="xlarge">
        XLarge
      </Label>
      <InputContainer>
        <input type="text" id="label-size-xlarge" name="label-size-xlarge" placeholder="Placeholder" />
      </InputContainer>
    </Stack>
  </>
);

export default LabelSizes;
