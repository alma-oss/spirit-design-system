import React from 'react';
import { Label } from '../../Label';
import InputContainer from '../InputContainer';

const InputContainerInputSize = () => (
  <div>
    <Label htmlFor="input-container-input-size">MMYY</Label>
    <InputContainer>
      <input type="text" size={4} id="input-container-input-size" name="inputSize" placeholder="0126" />
    </InputContainer>
  </div>
);

export default InputContainerInputSize;
