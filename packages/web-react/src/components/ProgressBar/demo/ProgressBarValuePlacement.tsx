import React from 'react';
import { ProgressBar } from '..';

const ProgressBarValuePlacement = () => (
  <>
    <h3 className="docs-Heading">Right</h3>
    <ProgressBar aria-label="Profile completeness" value={20} valueLabel="20 %" />

    <h3 className="docs-Heading">Bottom</h3>
    <ProgressBar
      aria-label="Awards collected"
      aria-valuetext="4 out of 20 awards"
      max={20}
      value={4}
      valuePlacement="bottom"
      valueLabel="4 out of 20 awards"
    />

    <h3 className="docs-Heading">None</h3>
    <ProgressBar aria-label="Profile completeness" value={20} />
  </>
);

export default ProgressBarValuePlacement;
