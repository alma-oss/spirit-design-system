import React from 'react';
import { ProgressBar } from '..';

const ProgressBarFieldComposition = () => (
  <>
    <ProgressBar
      helperText="Complete your profile to get more offers"
      id="progress-bar-helper-text"
      label="Profile completeness"
      value={60}
      valueLabel="60 %"
    />

    <ProgressBar
      color="success"
      id="progress-bar-validation-text"
      isRequired
      label="Profile completeness"
      validationState="success"
      validationText="Your profile is complete"
      value={100}
      valueLabel="100 %"
    />

    <ProgressBar
      color="danger"
      hasValidationIcon
      helperText="Complete your profile to get more offers"
      id="progress-bar-validation-text-icon"
      label="Profile completeness"
      validationState="danger"
      validationText="Add your work experience to continue"
      value={20}
      valueLabel="20 %"
    />
  </>
);

export default ProgressBarFieldComposition;
