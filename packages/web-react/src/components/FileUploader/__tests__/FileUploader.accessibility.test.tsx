import React, { type ReactElement, type ReactNode, cloneElement } from 'react';
import { accessibilityDisabledTest, accessibilityTest, accessibilityValidationStateTest } from '@local/tests';
import { FileUploader, FileUploaderInput, useFileQueue } from '..';

jest.mock('../../../hooks/useIcon');

describe('FileUploader accessibility', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const FileUploaderWrapper = ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
    const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();

    return (
      <FileUploader
        id="file-uploader"
        fileQueue={fileQueue}
        addToQueue={addToQueue}
        clearQueue={clearQueue}
        onDismiss={onDismiss}
        findInQueue={findInQueue}
        updateQueue={updateQueue}
      >
        {/* Clone children element and merge props from accessibility test helpers */}
        {cloneElement(children as ReactElement, props)}
      </FileUploader>
    );
  };

  accessibilityTest(
    (props) => (
      <FileUploaderWrapper>
        <FileUploaderInput {...props} id="file-uploader-input" label="Label" linkText="Upload" labelText="or drag" />
      </FileUploaderWrapper>
    ),
    'input[type="file"]',
  );

  accessibilityDisabledTest(
    (props) => (
      <FileUploaderWrapper>
        <FileUploaderInput
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
        <FileUploaderInput
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
