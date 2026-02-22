import React, { type ReactElement, type ReactNode, cloneElement } from 'react';
import { accessibilityDisabledTest, accessibilityTest, accessibilityValidationStateTest } from '@local/tests';
import { useFileUploaderDemo } from '../demo/useFileUploaderDemo';
import { UNSTABLE_FileUpload, UNSTABLE_FileUploadInput } from '..';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_FileUpload accessibility', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const FileUploaderWrapper = ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
    const { onFilesSelected } = useFileUploaderDemo(false);

    return (
      <UNSTABLE_FileUpload id="file-uploader">
        {/* Clone children element and merge props from accessibility test helpers */}
        {cloneElement(children as ReactElement, { ...props, onFilesSelected })}
      </UNSTABLE_FileUpload>
    );
  };

  accessibilityTest(
    (props) => (
      <FileUploaderWrapper>
        <UNSTABLE_FileUploadInput
          {...props}
          id="file-uploader-input"
          label="Label"
          linkText="Upload"
          labelText="or drag"
        />
      </FileUploaderWrapper>
    ),
    'input[type="file"]',
  );

  accessibilityDisabledTest(
    (props) => (
      <FileUploaderWrapper>
        <UNSTABLE_FileUploadInput
          {...props}
          id="file-uploader-input-disabled"
          label="Label"
          linkText="Upload"
          labelText="or drag"
        />
      </FileUploaderWrapper>
    ),
    'input[type="file"]',
  );

  accessibilityValidationStateTest(
    (props) => (
      <FileUploaderWrapper>
        <UNSTABLE_FileUploadInput
          {...props}
          id="file-uploader-input-validation"
          label="Label"
          linkText="Upload"
          labelText="or drag"
          isRequired
          validationText="Validation text"
        />
      </FileUploaderWrapper>
    ),
    'input[type="file"]',
  );
});
