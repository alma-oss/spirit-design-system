import React, { useState } from 'react';
import { Checkbox } from '../../Checkbox';
import { Radio } from '../../Radio';

const LabelCombinedCheckboxRadioItem = () => {
  const [checkboxItem, setCheckboxItem] = useState(false);
  const [checkboxItemDisabled, setCheckboxItemDisabled] = useState(false);
  const [radioItem, setRadioItem] = useState('');
  const [radioItemDisabled, setRadioItemDisabled] = useState('');

  return (
    <>
      <Checkbox
        id="checkbox-item-example"
        name="checkboxItemExample"
        label="Checkbox Item"
        isItem
        isChecked={checkboxItem}
        onChange={() => setCheckboxItem(!checkboxItem)}
      />
      <Checkbox
        id="checkbox-item-disabled"
        name="checkboxItemDisabled"
        label="Disabled Checkbox Item"
        isItem
        isDisabled
        isChecked={checkboxItemDisabled}
        onChange={() => setCheckboxItemDisabled(!checkboxItemDisabled)}
      />
      <Radio
        id="radio-item-example"
        name="example"
        label="Radio Item"
        isItem
        value="radio-item"
        isChecked={radioItem === 'radio-item'}
        onChange={() => setRadioItem('radio-item')}
      />
      <Radio
        id="radio-item-disabled"
        name="example-disabled"
        label="Disabled Radio Item"
        isItem
        isDisabled
        value="radio-item-disabled"
        isChecked={radioItemDisabled === 'radio-item-disabled'}
        onChange={() => setRadioItemDisabled('radio-item-disabled')}
      />
    </>
  );
};

export default LabelCombinedCheckboxRadioItem;
