import React, { useState } from 'react';
import { Checkbox } from '../../Checkbox';

const ValidationTextInlineCheckbox = () => {
  const [isCheckedDanger, setIsCheckedDanger] = useState(false);
  const [isCheckedWarning, setIsCheckedWarning] = useState(false);

  return (
    <>
      <Checkbox
        id="validation-text-checkbox-danger"
        name="checkboxDanger"
        label="Checkbox Label"
        validationState="danger"
        validationText="Danger validation text"
        isChecked={isCheckedDanger}
        onChange={() => setIsCheckedDanger(!isCheckedDanger)}
      />
      <Checkbox
        id="validation-text-checkbox-warning"
        name="checkboxWarning"
        label="Checkbox Label"
        hasValidationIcon
        validationState="warning"
        validationText="Warning validation text with icon"
        isChecked={isCheckedWarning}
        onChange={() => setIsCheckedWarning(!isCheckedWarning)}
      />
    </>
  );
};

export default ValidationTextInlineCheckbox;
