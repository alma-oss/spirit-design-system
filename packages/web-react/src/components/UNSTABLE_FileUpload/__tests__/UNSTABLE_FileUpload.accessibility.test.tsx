import React from 'react';
import { accessibilityDisabledTest, accessibilityTest, accessibilityValidationStateTest } from '@local/tests';
import { UNSTABLE_FileUpload } from '..';

jest.mock('../../../hooks/useIcon');

const defaultInputProps = {
  id: 'file-uploader-input',
  label: 'Label',
  linkText: 'Upload',
  labelText: 'or drag',
  name: 'attachments',
};

describe('UNSTABLE_FileUpload accessibility', () => {
  accessibilityTest((props) => <UNSTABLE_FileUpload {...defaultInputProps} {...props} />, 'input[type="file"]');

  accessibilityDisabledTest(
    (props) => <UNSTABLE_FileUpload {...defaultInputProps} id="file-uploader-input-disabled" {...props} />,
    'input[type="file"]',
  );

  accessibilityValidationStateTest(
    (props) => (
      <UNSTABLE_FileUpload
        {...defaultInputProps}
        id="file-uploader-input-validation"
        isRequired
        validationText="Validation text"
        {...props}
      />
    ),
    'input[type="file"]',
  );
});
