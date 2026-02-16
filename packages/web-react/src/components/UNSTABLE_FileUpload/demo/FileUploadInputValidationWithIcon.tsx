import React from 'react';
import { Stack } from '../..';
import { ValidationStates } from '../../../constants';
import { UNSTABLE_FileUpload } from '..';

const FileUploadInputValidationWithIcon = () => {
  const states = Object.values(ValidationStates);

  return (
    <>
      {states.map((state) => (
        <React.Fragment key={`file-uploader-${state}-validation-icon`}>
          <UNSTABLE_FileUpload
            id={`file-uploader-${state}-validation-icon`}
            helperText="Max file size is 10 MB"
            label="Label"
            labelText="or drag and drop here"
            linkText="Upload your file"
            name="attachmentsWarning"
            validationText={`This is ${state} validation text. Long validation text to show how it wraps.`}
            validationState={state}
            hasValidationIcon
            isRequired
          />
          <Stack aria-label="Attachments" elementType="ul" hasSpacing />
        </React.Fragment>
      ))}
    </>
  );
};

export default FileUploadInputValidationWithIcon;
