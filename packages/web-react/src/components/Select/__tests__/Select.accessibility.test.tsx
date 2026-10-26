import React from 'react';
import {
  accessibilityAriaDescribedByTest,
  accessibilityDisabledTest,
  accessibilityTest,
  accessibilityValidationStateTest,
} from '@local/tests';
import Select from '../Select';

jest.mock('../../../hooks/useIcon');

const selectOptions = (
  <>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </>
);

describe('Select accessibility', () => {
  accessibilityTest(
    (props) => (
      <Select {...props} id="select" label="Label">
        {selectOptions}
      </Select>
    ),
    'select',
  );

  accessibilityDisabledTest(
    (props) => (
      <Select {...props} id="select-disabled" label="Label">
        {selectOptions}
      </Select>
    ),
    'select',
  );

  accessibilityValidationStateTest(
    (props) => (
      <Select {...props} id="select-validation" label="Label" validationText="Validation text">
        {selectOptions}
      </Select>
    ),
    'select',
  );

  accessibilityAriaDescribedByTest(
    (props) => (
      <Select {...props} id="select-aria-describedby" label="Label">
        {selectOptions}
      </Select>
    ),
    'select',
  );
});
