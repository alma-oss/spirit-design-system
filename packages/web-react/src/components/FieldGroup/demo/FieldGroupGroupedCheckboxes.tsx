import React from 'react';
import { useToggle } from '../../../hooks';
import { Checkbox } from '../../Checkbox';
import FieldGroup from '../FieldGroup';

const FieldGroupGroupedCheckboxes = () => {
  const [isFirstCheckboxChecked, toggleFirstCheckbox] = useToggle(true);
  const [isSecondCheckboxChecked, toggleSecondCheckbox] = useToggle(false);

  return (
    <FieldGroup id="field-group-grouped-checkboxes" label="Label">
      <Checkbox
        id="checkbox-1"
        label="Checkbox Label"
        name="checkboxDefault"
        isChecked={isFirstCheckboxChecked}
        onChange={toggleFirstCheckbox}
      />
      <Checkbox
        id="checkbox-2"
        label="Checkbox Label"
        name="checkboxDefault"
        isChecked={isSecondCheckboxChecked}
        onChange={toggleSecondCheckbox}
      />
    </FieldGroup>
  );
};

export default FieldGroupGroupedCheckboxes;
