import React from 'react';
import { ProgressBar } from '..';

const completions = [0, 20, 40, 60, 80, 100];

const ProgressBarCompletion = () => (
  <>
    {completions.map((completion) => (
      <ProgressBar key={completion} aria-label="Profile completeness" value={completion} valueLabel={`${completion} %`} />
    ))}
  </>
);

export default ProgressBarCompletion;
