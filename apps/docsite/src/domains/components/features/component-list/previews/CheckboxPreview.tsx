'use client';

import { Checkbox } from '@alma-oss/spirit-web-react';
import React from 'react';

const CheckboxPreview = () => (
  <div style={{ display: 'flex' }}>
    <Checkbox
      aria-label="Checkbox"
      id="card-checkbox"
      isChecked
      isLabelHidden
      label="Checkbox"
      name="card-checkbox"
      onChange={() => undefined}
    />
  </div>
);

export default CheckboxPreview;
