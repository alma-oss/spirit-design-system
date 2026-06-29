import React from 'react';
import { PropsProvider } from '../../../context';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import { ValidationText } from '../../ValidationText';
import InputContainer from '../InputContainer';

const InputContainerValidation = () => (
  <>
    <Stack spacing="space-400">
      <PropsProvider value={{ validationState: 'warning' }}>
        <Label htmlFor="input-container-warning">Warning</Label>
        <InputContainer>
          <input
            type="text"
            id="input-container-warning"
            name="warning"
            placeholder="Placeholder"
            defaultValue="Filled"
          />
        </InputContainer>
        <ValidationText id="input-container-warning-validation-text" validationText="Validation text" />
      </PropsProvider>
    </Stack>

    <Stack spacing="space-400">
      <PropsProvider value={{ validationState: 'danger' }}>
        <Label htmlFor="input-container-danger">Danger</Label>
        <InputContainer>
          <input
            type="text"
            id="input-container-danger"
            name="danger"
            placeholder="Placeholder"
            defaultValue="Filled"
            aria-describedby="input-container-danger-validation-text"
          />
        </InputContainer>
        <ValidationText
          id="input-container-danger-validation-text"
          validationText={['Validation text', 'Second validation text']}
        />
      </PropsProvider>
    </Stack>
  </>
);

export default InputContainerValidation;
