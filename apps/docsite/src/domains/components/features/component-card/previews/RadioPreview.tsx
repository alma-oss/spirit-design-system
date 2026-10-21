'use client';

import { Radio } from '@alma-oss/spirit-web-react';
import React from 'react';

const RadioPreview = () => (
  <div style={{ display: 'flex' }}>
    <Radio
      id="card-radio"
      name="card-radio"
      label="Radio"
      aria-label="Radio"
      isChecked
      isLabelHidden
      onChange={() => {}}
    />
  </div>
);

export default RadioPreview;
