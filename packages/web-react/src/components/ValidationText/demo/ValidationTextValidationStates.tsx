import React from 'react';
import { TextField } from '../../TextField';

const ValidationTextValidationStates = () => (
  <>
    <TextField
      id="validation-text-danger"
      label="Danger"
      name="validationTextDanger"
      placeholder="Placeholder"
      validationState="danger"
      validationText="Danger validation text"
      defaultValue="Filled"
    />
    <TextField
      id="validation-text-warning"
      label="Warning"
      name="validationTextWarning"
      placeholder="Placeholder"
      validationState="warning"
      validationText="Warning validation text"
      defaultValue="Filled"
    />
    <TextField
      id="validation-text-success"
      label="Success"
      name="validationTextSuccess"
      placeholder="Placeholder"
      validationState="success"
      validationText="Success validation text"
      defaultValue="Filled"
    />
  </>
);

export default ValidationTextValidationStates;
