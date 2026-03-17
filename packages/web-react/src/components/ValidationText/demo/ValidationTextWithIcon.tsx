import React from 'react';
import { TextField } from '../../TextField';

const ValidationTextWithIcon = () => (
  <>
    <TextField
      id="validation-text-icon-success"
      label="Label"
      name="validationTextIconSuccess"
      placeholder="Placeholder"
      hasValidationIcon
      validationState="success"
      validationText="This is success validation text with icon."
      defaultValue="Filled"
    />
    <TextField
      id="validation-text-icon-warning"
      label="Label"
      name="validationTextIconWarning"
      placeholder="Placeholder"
      hasValidationIcon
      validationState="warning"
      validationText="This is warning validation text with icon."
      defaultValue="Filled"
    />
    <TextField
      id="validation-text-icon-danger"
      label="Label"
      name="validationTextIconDanger"
      placeholder="Placeholder"
      hasValidationIcon
      validationState="danger"
      validationText="This is danger validation text with icon."
      defaultValue="Filled"
    />
  </>
);

export default ValidationTextWithIcon;
