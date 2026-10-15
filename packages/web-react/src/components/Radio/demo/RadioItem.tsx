import React, { useState } from 'react';
import { Stack } from '../../Stack';
import Radio from '../Radio';

const RadioItem = () => {
  const [selectedRadio, setSelectedRadio] = useState('radio-item-default-checked');

  return (
    <Stack>
      <Radio
        id="radio-item-default"
        isItem
        label="Radio Label"
        name="item"
        isChecked={selectedRadio === 'radio-item-default'}
        onChange={() => setSelectedRadio('radio-item-default')}
      />

      <Radio
        id="radio-item-default-checked"
        isItem
        label="Radio Label"
        name="item"
        isChecked={selectedRadio === 'radio-item-default-checked'}
        onChange={() => setSelectedRadio('radio-item-default-checked')}
      />

      <Radio
        helperText="Helper text"
        id="radio-item-helper-text"
        isItem
        label="Radio Label"
        name="item"
        isChecked={selectedRadio === 'radio-item-helper-text'}
        onChange={() => setSelectedRadio('radio-item-helper-text')}
      />

      <Radio id="radio-item-disabled" isDisabled isItem label="Radio Label" name="itemDisabled" />

      <Radio
        helperText="Helper text"
        id="radio-item-disabled-helper-text"
        isDisabled
        isItem
        label="Radio Label"
        name="itemDisabled"
        isChecked
      />

      <Radio id="radio-item-size-small" isItem label="Small" name="itemSize" size="small" />
      <Radio id="radio-item-size-medium" isItem label="Medium (default)" name="itemSize" />
      <Radio id="radio-item-size-large" isItem label="Large" name="itemSize" size="large" />
    </Stack>
  );
};

export default RadioItem;
