import React from 'react';
import { ProgressBar } from '..';

const ProgressBarSizes = () => (
  <>
    <ProgressBar id="progress-bar-size-small" label="Small" size="small" value={60} />
    <ProgressBar id="progress-bar-size-medium" label="Medium (default)" value={60} />
    <ProgressBar id="progress-bar-size-large" label="Large" size="large" value={60} />
  </>
);

export default ProgressBarSizes;
