import React, { useState } from 'react';
import { Radio } from '../../Radio';
import FieldGroup from '../FieldGroup';

const FieldGroupGroupedRadios = () => {
  const [selectedRadio, setSelectedRadio] = useState('radio-1');

  return (
    <FieldGroup id="field-group-grouped-radios" label="Label">
      <Radio
        id="radio-1"
        label="Radio Label"
        name="radioDefault"
        isChecked={selectedRadio === 'radio-1'}
        onChange={() => setSelectedRadio('radio-1')}
      />
      <Radio
        id="radio-2"
        label="Radio Label"
        name="radioDefault"
        isChecked={selectedRadio === 'radio-2'}
        onChange={() => setSelectedRadio('radio-2')}
      />
    </FieldGroup>
  );
};

export default FieldGroupGroupedRadios;
