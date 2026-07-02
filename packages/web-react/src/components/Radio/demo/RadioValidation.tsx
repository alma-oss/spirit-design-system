import React, { useState } from 'react';
import { Stack } from '../../Stack';
import Radio from '../Radio';

const RadioValidation = () => {
  const [selectedRadio, setSelectedRadio] = useState('radio-warning-helper-text');

  return (
    <Stack>
      <Radio
        id="radio-success"
        label="Radio Label"
        name="validation"
        validationState="success"
        isChecked={selectedRadio === 'radio-success'}
        onChange={() => setSelectedRadio('radio-success')}
      />

      <Radio
        id="radio-warning"
        label="Radio Label"
        name="validation"
        validationState="warning"
        isChecked={selectedRadio === 'radio-warning'}
        onChange={() => setSelectedRadio('radio-warning')}
      />

      <Radio
        id="radio-danger"
        label="Radio Label"
        name="validation"
        validationState="danger"
        isChecked={selectedRadio === 'radio-danger'}
        onChange={() => setSelectedRadio('radio-danger')}
      />

      <Radio
        helperText="Helper text"
        id="radio-warning-helper-text"
        label="Radio Label"
        name="validation"
        validationState="warning"
        isChecked={selectedRadio === 'radio-warning-helper-text'}
        onChange={() => setSelectedRadio('radio-warning-helper-text')}
      />
    </Stack>
  );
};

export default RadioValidation;
