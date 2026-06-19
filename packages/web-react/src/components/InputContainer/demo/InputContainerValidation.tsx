import React from 'react';
import { PropsProvider } from '../../../context';
import { Label } from '../../Label';
import { ValidationText } from '../../ValidationText';
import InputContainer from '../InputContainer';

const InputContainerValidation = () => (
  <>
    <div>
      <PropsProvider
        value={{ inputContainer: { validationState: 'warning' }, validationText: { validationState: 'warning' } }}
      >
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
    </div>

    <div>
      <PropsProvider
        value={{ inputContainer: { validationState: 'danger' }, validationText: { validationState: 'danger' } }}
      >
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
    </div>
  </>
);

export default InputContainerValidation;
