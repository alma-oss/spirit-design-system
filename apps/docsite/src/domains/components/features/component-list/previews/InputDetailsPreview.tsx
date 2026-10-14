'use client';

import { Checkbox } from '@alma-oss/spirit-web-react';
import React from 'react';

const InputDetailsPreview = () => (
  <Checkbox
    id="card-input-details"
    name="consent"
    label="I agree to the terms"
    details={<span>We want to keep you informed</span>}
    UNSAFE_style={{ width: 280 }}
  />
);

export default InputDetailsPreview;
