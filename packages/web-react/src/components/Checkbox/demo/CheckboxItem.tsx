import React, { useState } from 'react';
import { Stack } from '../../Stack';
import Checkbox from '../Checkbox';

const CheckboxItem = () => {
  const [isCheckedItemDefault, setIsCheckedItemDefault] = useState(false);
  const [isCheckedItemDefaultChecked, setIsCheckedItemDefaultChecked] = useState(true);
  const [isCheckedItemHelperText, setIsCheckedItemHelperText] = useState(false);

  return (
    <Stack hasSpacing>
      <Checkbox
        id="checkbox-item-default"
        name="checkboxItemDefault"
        label="Checkbox Label"
        isItem
        isChecked={isCheckedItemDefault}
        onChange={() => setIsCheckedItemDefault(!isCheckedItemDefault)}
      />

      <Checkbox
        id="checkbox-item-default-checked"
        name="checkboxItemDefaultChecked"
        label="Checkbox Label"
        isItem
        isChecked={isCheckedItemDefaultChecked}
        onChange={() => setIsCheckedItemDefaultChecked(!isCheckedItemDefaultChecked)}
      />

      <Checkbox
        id="checkbox-item-helper-text"
        name="checkboxItemHelperText"
        label="Checkbox Label"
        isItem
        helperText="Helper text"
        isChecked={isCheckedItemHelperText}
        onChange={() => setIsCheckedItemHelperText(!isCheckedItemHelperText)}
      />

      <Checkbox id="checkbox-item-disabled" name="checkboxItemDisabled" label="Checkbox Label" isItem isDisabled />

      <Checkbox
        id="checkbox-item-disabled-helper-text"
        name="checkboxItemDisabledHelperText"
        label="Checkbox Label"
        isItem
        helperText="Helper text"
        isDisabled
        isRequired
        isChecked
      />
    </Stack>
  );
};

export default CheckboxItem;
