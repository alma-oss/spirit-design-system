import React from 'react';
import { accessibilityDisabledTest, accessibilityTest, accessibilityValidationStateTest } from '@local/tests';
import { File } from '..';

jest.mock('../../../hooks/useIcon');

const defaultProps = {
  id: 'unstable-file',
  label: 'Document.pdf',
  onDismiss: () => {},
};

describe('File accessibility', () => {
  accessibilityTest(
    (props) => (
      <ul>
        <File {...defaultProps} {...props} />
      </ul>
    ),
    'li',
  );

  accessibilityDisabledTest(
    (props) => (
      <ul>
        <File {...defaultProps} {...props} />
      </ul>
    ),
    'button',
  );

  accessibilityValidationStateTest(
    (props) => (
      <ul>
        <File {...defaultProps} validationText="Validation text" {...props} />
      </ul>
    ),
    'li',
  );
});
