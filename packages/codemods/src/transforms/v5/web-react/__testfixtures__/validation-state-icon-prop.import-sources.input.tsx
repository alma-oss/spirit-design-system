import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { ValidationText as SpiritValidationText } from '@org/design-system';
import { ValidationText } from '@other/design-system';

export const MyComponent = () => (
  <>
    <SpiritValidationText validationText="Saved successfully." hasValidationStateIcon="success" />
    <ValidationText validationText="Other message." hasValidationStateIcon="warning" />
  </>
);
