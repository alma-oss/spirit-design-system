import React from 'react';
import { ProgressBar } from '..';

const ProgressBarDisabled = () => (
  <ProgressBar
    helperText="Complete your profile to get more offers"
    id="progress-bar-disabled"
    isDisabled
    label="Profile completeness"
    value={40}
    valueLabel="40 %"
  />
);

export default ProgressBarDisabled;
