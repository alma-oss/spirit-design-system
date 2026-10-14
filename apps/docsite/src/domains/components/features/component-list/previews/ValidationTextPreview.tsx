'use client';

import { TextField } from '@alma-oss/spirit-web-react';
import React from 'react';

const ValidationTextPreview = () => (
  <TextField
    id="card-validation-text"
    label="Email"
    placeholder="Placeholder"
    defaultValue="john@"
    validationState="danger"
    validationText="Enter a valid email address"
    UNSAFE_style={{ width: 280 }}
  />
);

export default ValidationTextPreview;
