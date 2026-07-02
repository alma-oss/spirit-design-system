import React, { useState } from 'react';
import { Stack } from '../../Stack';
import Checkbox from '../Checkbox';

const CheckboxValidation = () => {
  const [isCheckedSuccess, setIsCheckedSuccess] = useState(false);
  const [isCheckedWarning, setIsCheckedWarning] = useState(false);
  const [isCheckedDanger, setIsCheckedDanger] = useState(false);
  const [isCheckedWarningHelperText, setIsCheckedWarningHelperText] = useState(true);

  return (
    <Stack>
      <Checkbox
        id="checkbox-success"
        name="checkboxSuccess"
        label="Checkbox Label"
        validationState="success"
        isChecked={isCheckedSuccess}
        onChange={() => setIsCheckedSuccess(!isCheckedSuccess)}
      />
      <Checkbox
        id="checkbox-warning"
        name="checkboxWarning"
        label="Checkbox Label"
        validationState="warning"
        validationText="Warning validation text"
        isChecked={isCheckedWarning}
        onChange={() => setIsCheckedWarning(!isCheckedWarning)}
      />
      <Checkbox
        id="checkbox-danger"
        name="checkboxDanger"
        label="Checkbox Label"
        validationState="danger"
        validationText={['First validation text', 'Second validation text']}
        isChecked={isCheckedDanger}
        onChange={() => setIsCheckedDanger(!isCheckedDanger)}
      />
      <Checkbox
        id="checkbox-warning-helper-text"
        name="checkboxWarningHelperText"
        label="Checkbox Label"
        validationState="warning"
        validationText="Warning validation text"
        helperText="Helper text"
        isChecked={isCheckedWarningHelperText}
        onChange={() => setIsCheckedWarningHelperText(!isCheckedWarningHelperText)}
      />
    </Stack>
  );
};

export default CheckboxValidation;
