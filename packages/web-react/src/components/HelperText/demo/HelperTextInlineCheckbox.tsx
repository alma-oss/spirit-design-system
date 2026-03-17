import React, { useState } from 'react';
import { Checkbox } from '../../Checkbox';

const HelperTextInlineCheckbox = () => {
  const [isCheckedDefault, setIsCheckedDefault] = useState(false);
  const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);

  return (
    <>
      <Checkbox
        id="checkbox-helper-text-example"
        name="checkboxHelperTextExample"
        label="Checkbox Label"
        helperText="Helper text"
        isChecked={isCheckedDefault}
        onChange={() => setIsCheckedDefault(!isCheckedDefault)}
      />
      <Checkbox
        id="checkbox-helper-text-disabled"
        name="checkboxHelperTextDisabled"
        label="Disabled Checkbox"
        isDisabled
        helperText="Helper text"
        isChecked={isCheckedDisabled}
        onChange={() => setIsCheckedDisabled(!isCheckedDisabled)}
      />
    </>
  );
};

export default HelperTextInlineCheckbox;
