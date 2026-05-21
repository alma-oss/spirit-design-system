import React from 'react';
import { FillVariants } from '../../../constants';
import TextField from '../TextField';

const TextFieldVariants = () => (
  <>
    <TextField
      id="textfield-variant-fill"
      label="Fill (default)"
      name="textfieldVariantFill"
      placeholder="Placeholder"
      variant={FillVariants.FILL}
    />

    <TextField
      id="textfield-variant-outline"
      label="Outline"
      name="textfieldVariantOutline"
      placeholder="Placeholder"
      variant={FillVariants.OUTLINE}
    />
  </>
);

export default TextFieldVariants;
