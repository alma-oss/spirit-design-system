import React from 'react';
import { ValidationStates } from '../../../constants';
import { Stack } from '../../Stack';
import Checkbox from '../Checkbox';

const CheckboxValidationWithIcon = () => {
  const states = Object.values(ValidationStates);

  return (
    <Stack hasSpacing>
      {states.map((state) => (
        <Checkbox
          id={`checkbox-${state}-validation-icon`}
          name="checkboxWarning"
          label="Checkbox Label"
          key={`checkbox-${state}-icon`}
          validationState={state}
          validationText={`This is ${state} validation text.`}
          hasValidationIcon
        />
      ))}
    </Stack>
  );
};

export default CheckboxValidationWithIcon;
