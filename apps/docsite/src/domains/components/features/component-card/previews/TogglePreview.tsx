import { Toggle } from '@alma-oss/spirit-web-react';
import React from 'react';

const TogglePreview = () => (
  <div style={{ display: 'flex' }}>
    <Toggle id="card-toggle" name="card-toggle" label="Toggle" aria-label="Toggle" isChecked isLabelHidden />
  </div>
);

export default TogglePreview;
