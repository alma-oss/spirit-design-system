import React from 'react';
import { TextField } from '../../TextField';

const ValidationTextDisabled = () => (
  <TextField
    id="validation-text-disabled"
    label="Disabled"
    name="validationTextDisabled"
    placeholder="Placeholder"
    isDisabled
    validationState="danger"
    validationText="Danger validation text (disabled)"
    defaultValue="Filled"
  />
);

export default ValidationTextDisabled;
