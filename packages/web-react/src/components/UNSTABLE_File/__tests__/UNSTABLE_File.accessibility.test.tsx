import React from 'react';
import { accessibilityDisabledTest, accessibilityTest, accessibilityValidationStateTest } from '@local/tests';
import { UNSTABLE_File } from '..';

jest.mock('../../../hooks/useIcon');

const defaultProps = {
  id: 'unstable-file',
  label: 'Document.pdf',
  onDismiss: () => {},
};

describe('UNSTABLE_File accessibility', () => {
  accessibilityTest(
    (props) => (
      <ul>
        <UNSTABLE_File {...defaultProps} {...props} />
      </ul>
    ),
    'li',
  );

  accessibilityDisabledTest(
    (props) => (
      <ul>
        <UNSTABLE_File {...defaultProps} {...props} />
      </ul>
    ),
    'button',
  );

  accessibilityValidationStateTest(
    (props) => (
      <ul>
        <UNSTABLE_File {...defaultProps} validationText="Validation text" {...props} />
      </ul>
    ),
    'li',
  );
});
