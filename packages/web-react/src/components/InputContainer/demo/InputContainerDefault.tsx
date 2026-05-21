import React from 'react';
import { Label } from '../../Label';
import InputContainer from '../InputContainer';

const InputContainerDefault = () => (
  <div>
    <Label htmlFor="input-container-default">Label</Label>
    <InputContainer>
      <input type="text" id="input-container-default" name="default" placeholder="Placeholder" />
    </InputContainer>
  </div>
);

export default InputContainerDefault;
