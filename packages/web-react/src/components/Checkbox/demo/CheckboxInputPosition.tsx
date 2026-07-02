import React, { useState } from 'react';
import { Stack } from '../../Stack';
import Checkbox from '../Checkbox';

const CheckboxInputPosition = () => {
  const [isStartChecked, setStartChecked] = useState(false);
  const [isEndChecked, setEndChecked] = useState(false);
  const [isResponsiveChecked, setResponsiveChecked] = useState(false);

  return (
    <Stack>
      <Checkbox
        id="checkbox-input-position-start"
        name="checkboxInputPositionStart"
        label="Input on Start (Default)"
        isChecked={isStartChecked}
        onChange={() => setStartChecked(!isStartChecked)}
      />
      <Checkbox
        id="checkbox-input-position-end"
        name="checkboxInputPositionEnd"
        label="Input on End"
        inputPosition="end"
        isChecked={isEndChecked}
        onChange={() => setEndChecked(!isEndChecked)}
      />
      <Checkbox
        id="checkbox-input-position-responsive"
        name="checkboxInputPositionResponsive"
        label="Responsive Position"
        inputPosition={{ mobile: 'start', tablet: 'end', desktop: 'start' }}
        isChecked={isResponsiveChecked}
        onChange={() => setResponsiveChecked(!isResponsiveChecked)}
      />
    </Stack>
  );
};

export default CheckboxInputPosition;
