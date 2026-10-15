import React from 'react';
import { TextField } from '../../TextField';
import FieldGroup from '../FieldGroup';

const FieldGroupGroupedTextFields = () => (
  <FieldGroup id="field-group-grouped-text-fields" label="Label" size="large">
    <TextField
      id="field-group-text-field-small"
      label="Small"
      name="fieldGroupTextFieldSmall"
      placeholder="Placeholder"
      size="small"
    />
    <TextField
      id="field-group-text-field-medium"
      label="Medium (default)"
      name="fieldGroupTextFieldMedium"
      placeholder="Placeholder"
    />
    <TextField
      id="field-group-text-field-large"
      label="Large"
      name="fieldGroupTextFieldLarge"
      placeholder="Placeholder"
      size="large"
    />
  </FieldGroup>
);

export default FieldGroupGroupedTextFields;
