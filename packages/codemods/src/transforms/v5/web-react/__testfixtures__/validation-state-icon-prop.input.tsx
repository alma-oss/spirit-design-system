import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { TextField, ValidationText } from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    <ValidationText validationText="Saved successfully." hasValidationStateIcon="success" />
    <ValidationText validationText="Required field." />
    <TextField id="name" label="Name" hasValidationIcon validationState="danger" />
  </>
);
