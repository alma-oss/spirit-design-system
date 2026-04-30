import React from 'react';
import { PropsProvider } from '../../../context';
import { Label } from '../../Label';
import InputContainer from '../InputContainer';

const InputContainerDisabled = () => (
  <div>
    <PropsProvider value={{ isDisabled: true }}>
      <Label htmlFor="input-container-disabled">Label</Label>
      <InputContainer>
        <input type="text" id="input-container-disabled" name="disabled" placeholder="Placeholder" disabled />
      </InputContainer>
    </PropsProvider>
  </div>
);

export default InputContainerDisabled;
