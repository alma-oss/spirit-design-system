import React from 'react';
import {
  accessibilityAriaDescribedByTest,
  accessibilityDisabledTest,
  accessibilityTest,
  accessibilityValidationStateTest,
} from '@local/tests';
import { Checkbox } from '../../Checkbox';
import FieldGroup from '../FieldGroup';

jest.mock('../../../hooks/useIcon');

describe('FieldGroup accessibility', () => {
  const fieldGroupContent = (
    <>
      <Checkbox id="checkbox-1" name="checkbox-1" label="Option 1" />
      <Checkbox id="checkbox-2" name="checkbox-2" label="Option 2" />
    </>
  );

  accessibilityTest(
    (props) => (
      <FieldGroup {...props} id="field-group-default" label="Label">
        {fieldGroupContent}
      </FieldGroup>
    ),
    'fieldset',
  );

  accessibilityDisabledTest(
    (props) => (
      <FieldGroup {...props} id="field-group-disabled" label="Label" isDisabled>
        {fieldGroupContent}
      </FieldGroup>
    ),
    'fieldset',
  );

  accessibilityValidationStateTest(
    (props) => (
      <FieldGroup {...props} id="field-group-validation" label="Label" validationText="Validation text">
        {fieldGroupContent}
      </FieldGroup>
    ),
    'fieldset',
  );

  accessibilityAriaDescribedByTest(
    (props) => (
      <FieldGroup {...props} id="field-group-aria-describedby" label="Label">
        {fieldGroupContent}
      </FieldGroup>
    ),
    'fieldset',
  );
});
