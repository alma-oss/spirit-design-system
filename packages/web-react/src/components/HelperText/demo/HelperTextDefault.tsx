import React from 'react';
import { TextField } from '../../TextField';

const HelperTextDefault = () => (
  <>
    <TextField
      id="text-field-helper-text-example"
      label="Label"
      name="textFieldHelperTextExample"
      placeholder="Placeholder"
      helperText="Helper text"
    />
    <TextField
      id="text-field-helper-text-disabled"
      label="Disabled Field"
      name="textFieldHelperTextDisabled"
      placeholder="Placeholder"
      isDisabled
      helperText="Helper text"
    />
  </>
);

export default HelperTextDefault;
