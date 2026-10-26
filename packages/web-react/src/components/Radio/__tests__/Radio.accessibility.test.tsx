import React from 'react';
import {
  accessibilityAriaDescribedByTest,
  accessibilityDisabledTest,
  accessibilityTest,
  accessibilityValidationStateTest,
} from '@local/tests';
import Radio from '../Radio';

describe('Radio accessibility', () => {
  accessibilityTest((props) => <Radio {...props} id="radio" label="Label" />, 'input');

  accessibilityDisabledTest((props) => <Radio {...props} id="radio-disabled" label="Label" />, 'input');

  accessibilityValidationStateTest((props) => <Radio {...props} id="radio-validation" label="Label" />, 'input');

  accessibilityAriaDescribedByTest((props) => <Radio {...props} id="radio-aria-describedby" label="Label" />, 'input', {
    hasValidationText: false,
  });
});
