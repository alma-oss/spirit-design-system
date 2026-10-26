import React from 'react';
import {
  accessibilityAriaDescribedByTest,
  accessibilityAriaDetailsTest,
  accessibilityDisabledTest,
  accessibilityTest,
  accessibilityValidationStateTest,
} from '@local/tests';
import Toggle from '../Toggle';

describe('Toggle accessibility', () => {
  accessibilityTest(
    (props) => <Toggle {...props} id="toggle" label="Toggle me" helperText="Helper text" />,
    'input[type="checkbox"]',
  );

  accessibilityDisabledTest(
    (props) => <Toggle {...props} id="toggle" label="Toggle me" isChecked />,
    'input[type="checkbox"]',
  );

  accessibilityValidationStateTest(
    (props) => <Toggle {...props} id="toggle" label="Toggle me" validationText="Validation text" />,
    'input[type="checkbox"]',
  );

  accessibilityAriaDescribedByTest(
    (props) => <Toggle {...props} id="toggle-aria-describedby" label="Toggle me" />,
    'input[type="checkbox"]',
  );

  accessibilityAriaDetailsTest(
    (props) => <Toggle {...props} id="toggle-aria-details" label="Toggle me" />,
    'input[type="checkbox"]',
  );
});
