import React from 'react';
import { accessibilityDisabledTest, accessibilityTest } from '@local/tests';
import ProgressBar from '../ProgressBar';

describe('ProgressBar accessibility', () => {
  accessibilityTest((props) => <ProgressBar {...props} aria-label="Label" value={50} />, 'progress');

  accessibilityDisabledTest((props) => <ProgressBar {...props} aria-label="Label" value={50} />, 'progress');

  accessibilityTest((props) => <ProgressBar {...props} id="progress-bar-label" label="Label" value={50} />, 'progress');
});
