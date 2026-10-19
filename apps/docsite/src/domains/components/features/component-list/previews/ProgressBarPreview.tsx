import { ProgressBar } from '@alma-oss/spirit-web-react';
import React from 'react';

const ProgressBarPreview = () => (
  <ProgressBar
    aria-label="Progress"
    color="informative"
    max={100}
    value={60}
    valueLabel={'60\u00a0%'}
    UNSAFE_style={{ width: 240 }}
  />
);

export default ProgressBarPreview;
