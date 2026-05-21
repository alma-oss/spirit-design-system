import React from 'react';
import { FillVariants } from '../../../constants';
import { Label } from '../../Label';
import InputContainer from '../InputContainer';

const InputContainerVariants = () => (
  <>
    <div>
      <Label htmlFor="input-container-variant-fill">Fill (default)</Label>
      <InputContainer variant={FillVariants.FILL} size="medium">
        <input type="text" id="input-container-variant-fill" name="variantFill" placeholder="Placeholder" />
      </InputContainer>
    </div>

    <div>
      <Label htmlFor="input-container-variant-outline">Outline</Label>
      <InputContainer variant={FillVariants.OUTLINE} size="medium">
        <input type="text" id="input-container-variant-outline" name="variantOutline" placeholder="Placeholder" />
      </InputContainer>
    </div>
  </>
);

export default InputContainerVariants;
