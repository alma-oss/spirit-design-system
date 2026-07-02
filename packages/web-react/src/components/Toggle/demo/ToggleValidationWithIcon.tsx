import React from 'react';
import { ValidationStates } from '../../../constants';
import { Stack } from '../../Stack';
import Toggle from '../Toggle';

const ToggleValidationWithIcon = () => {
  const states = Object.values(ValidationStates);

  return (
    <Stack>
      {states.map((state) => (
        <Toggle
          id={`toggle-${state}-validation-icon`}
          label="Toggle Label"
          validationText={`This is ${state} validation text. Long validation text to show how it wraps.`}
          validationState={state}
          hasValidationIcon
          name="default"
          isChecked
          key={`toggle-${state}-validation-icon`}
        />
      ))}
    </Stack>
  );
};

export default ToggleValidationWithIcon;
