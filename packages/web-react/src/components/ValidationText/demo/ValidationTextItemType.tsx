import React, { useState } from 'react';
import { Checkbox } from '../../Checkbox';

const ValidationTextItemType = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      id="validation-text-checkbox-item"
      name="checkboxItem"
      label="Checkbox Label"
      isItem
      validationState="danger"
      validationText="Item mode validation text"
      isChecked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    />
  );
};

export default ValidationTextItemType;
