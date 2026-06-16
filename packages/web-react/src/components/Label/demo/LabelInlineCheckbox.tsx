import React, { useState } from 'react';
import { Checkbox } from '../../Checkbox';
import { Stack } from '../../Stack';

const LabelInlineCheckbox = () => {
  const [isCheckedDefault, setIsCheckedDefault] = useState(false);
  const [isCheckedRequired, setIsCheckedRequired] = useState(false);
  const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);

  return (
    <Stack hasSpacing>
      <Checkbox
        id="checkbox-example"
        name="checkboxExample"
        label="Checkbox Label"
        isChecked={isCheckedDefault}
        onChange={() => setIsCheckedDefault(!isCheckedDefault)}
      />
      <Checkbox
        id="checkbox-required"
        name="checkboxRequired"
        label="Required Checkbox"
        isRequired
        isChecked={isCheckedRequired}
        onChange={() => setIsCheckedRequired(!isCheckedRequired)}
      />
      <Checkbox
        id="checkbox-disabled"
        name="checkboxDisabled"
        label="Disabled Checkbox"
        isDisabled
        isChecked={isCheckedDisabled}
        onChange={() => setIsCheckedDisabled(!isCheckedDisabled)}
      />
    </Stack>
  );
};

export default LabelInlineCheckbox;
