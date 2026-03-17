import React from 'react';
import { TextField } from '../../TextField';

const ValidationTextAsList = () => (
  <TextField
    id="validation-text-list"
    label="Label"
    name="validationTextList"
    placeholder="Placeholder"
    validationState="danger"
    validationText={['First validation text', 'Second validation text']}
    defaultValue="Filled"
  />
);

export default ValidationTextAsList;
