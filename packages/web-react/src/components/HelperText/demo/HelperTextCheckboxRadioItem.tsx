import React, { useState } from 'react';
import { Checkbox } from '../../Checkbox';
import { Radio } from '../../Radio';

const HelperTextCheckboxRadioItem = () => {
  const [checkboxItem, setCheckboxItem] = useState(false);
  const [checkboxItemDisabled, setCheckboxItemDisabled] = useState(false);
  const [radioItem, setRadioItem] = useState('');
  const [radioItemDisabled, setRadioItemDisabled] = useState('');

  return (
    <>
      <Checkbox
        id="checkbox-item-helper-text-example"
        name="checkboxItemHelperTextExample"
        label="Checkbox Item"
        isItem
        helperText="Helper text"
        isChecked={checkboxItem}
        onChange={() => setCheckboxItem(!checkboxItem)}
      />
      <Checkbox
        id="checkbox-item-helper-text-disabled"
        name="checkboxItemHelperTextDisabled"
        label="Disabled Checkbox Item"
        isItem
        isDisabled
        helperText="Helper text"
        isChecked={checkboxItemDisabled}
        onChange={() => setCheckboxItemDisabled(!checkboxItemDisabled)}
      />
      <Radio
        id="radio-item-helper-text-example"
        name="helper-text-example"
        label="Radio Item"
        isItem
        helperText="Helper text"
        value="radio-item"
        isChecked={radioItem === 'radio-item'}
        onChange={() => setRadioItem('radio-item')}
      />
      <Radio
        id="radio-item-helper-text-disabled"
        name="helper-text-example-disabled"
        label="Disabled Radio Item"
        isItem
        isDisabled
        helperText="Helper text"
        value="radio-item-disabled"
        isChecked={radioItemDisabled === 'radio-item-disabled'}
        onChange={() => setRadioItemDisabled('radio-item-disabled')}
      />
    </>
  );
};

export default HelperTextCheckboxRadioItem;
