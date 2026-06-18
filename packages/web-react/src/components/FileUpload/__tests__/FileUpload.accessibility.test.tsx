import React from 'react';
import { accessibilityDisabledTest, accessibilityTest, accessibilityValidationStateTest } from '@local/tests';
import { FileUpload } from '..';

jest.mock('../../../hooks/useIcon');

const defaultInputProps = {
  id: 'file-uploader-input',
  inputDragAndDropText: 'or drag',
  inputUploadText: 'Upload',
  label: 'Label',
  name: 'attachments',
};

describe('FileUpload accessibility', () => {
  accessibilityTest((props) => <FileUpload {...defaultInputProps} {...props} />, 'input[type="file"]');

  accessibilityDisabledTest(
    (props) => <FileUpload {...defaultInputProps} id="file-uploader-input-disabled" {...props} />,
    'input[type="file"]',
  );

  accessibilityValidationStateTest(
    (props) => (
      <FileUpload
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
