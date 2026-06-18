import React, { useState } from 'react';
import { Stack } from '../../Stack';
import Toggle from '../Toggle';

const ToggleInputPosition = () => {
  const [isStartChecked, setStartChecked] = useState(false);
  const [isEndChecked, setEndChecked] = useState(false);
  const [isResponsiveChecked, setResponsiveChecked] = useState(false);

  return (
    <Stack hasSpacing>
      <Toggle
        id="toggle-input-position-start"
        name="toggleInputPositionStart"
        label="Input on Start"
        inputPosition="start"
        isChecked={isStartChecked}
        onChange={() => setStartChecked(!isStartChecked)}
      />
      <Toggle
        id="toggle-input-position-end"
        name="toggleInputPositionEnd"
        label="Input on End (Default)"
        isChecked={isEndChecked}
        onChange={() => setEndChecked(!isEndChecked)}
      />
      <Toggle
        id="toggle-input-position-responsive"
        name="toggleInputPositionResponsive"
        label="Responsive Position"
        inputPosition={{ mobile: 'end', tablet: 'start', desktop: 'end' }}
        isChecked={isResponsiveChecked}
        onChange={() => setResponsiveChecked(!isResponsiveChecked)}
      />
    </Stack>
  );
};

export default ToggleInputPosition;
