import React from 'react';
import {
  accessibilityAriaDescribedByTest,
  accessibilityAriaDetailsTest,
  accessibilityDisabledTest,
  accessibilityTest,
  accessibilityValidationStateTest,
} from '@local/tests';
import Checkbox from '../Checkbox';

describe('Checkbox accessibility', () => {
  accessibilityTest(
    (props) => <Checkbox {...props} id="checkbox" name="checkbox" label="Check me" helperText="Helper text" />,
    'input[type="checkbox"]',
  );

  accessibilityDisabledTest(
    (props) => <Checkbox {...props} id="checkbox" name="checkbox" label="Check me" />,
    'input[type="checkbox"]',
  );

  accessibilityValidationStateTest(
    (props) => (
      <Checkbox {...props} id="checkbox" name="checkbox" label="Check me" isRequired validationText="Validation text" />
    ),
    'input[type="checkbox"]',
  );

  accessibilityAriaDescribedByTest(
    (props) => <Checkbox {...props} id="checkbox-aria-describedby" name="checkbox" label="Check me" />,
    'input[type="checkbox"]',
  );

  accessibilityAriaDetailsTest(
    (props) => <Checkbox {...props} id="checkbox-aria-details" name="checkbox" label="Check me" />,
    'input[type="checkbox"]',
  );
});
