'use client';

import React from 'react';
import { ValidationStates } from '../../../constants';
import type { ValidationState } from '../../../types';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

type ValidationDemoConfig = {
  validationState: NonNullable<ValidationState>;
  validationText: string;
  isRequired?: boolean;
  defaultSelectedKeys?: string[];
};

const VALIDATION_STATE_DEMOS: ValidationDemoConfig[] = [
  {
    validationState: ValidationStates.DANGER,
    validationText: 'Please select at least one language',
    isRequired: true,
  },
  {
    validationState: ValidationStates.WARNING,
    validationText: 'Consider adding more languages',
    defaultSelectedKeys: ['cs'],
  },
  {
    validationState: ValidationStates.SUCCESS,
    validationText: 'Great choice!',
    defaultSelectedKeys: ['cs', 'dk'],
  },
];

const PickerValidationStates = () => (
  <>
    {VALIDATION_STATE_DEMOS.map(({ validationState, validationText, isRequired, defaultSelectedKeys }) => (
      <UNSTABLE_UncontrolledPicker
        key={validationState}
        id={`demo-picker-validation-${validationState}`}
        label="Languages"
        validationState={validationState}
        validationText={validationText}
        {...(isRequired ? { isRequired: true } : {})}
        {...(defaultSelectedKeys ? { defaultSelectedKeys } : {})}
      >
        <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
      </UNSTABLE_UncontrolledPicker>
    ))}
  </>
);

export default PickerValidationStates;
