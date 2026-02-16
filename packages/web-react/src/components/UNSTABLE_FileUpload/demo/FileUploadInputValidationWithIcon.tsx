import React from 'react';
import { ValidationStates } from '../../../constants';
import { UNSTABLE_FileUpload, UNSTABLE_FileUploadAttachments, UNSTABLE_FileUploadInput } from '..';

const FileUploadInputValidationWithIcon = () => {
  const states = Object.values(ValidationStates);

  return (
    <>
      {states.map((state) => (
        <UNSTABLE_FileUpload
          id={`file-uploader-${state}-validation-icon`}
          key={`file-uploader-${state}-validation-icon`}
        >
          <UNSTABLE_FileUploadInput
            helperText="Max file size is 10 MB"
            id={`file-uploader-${state}-validation-input-icon`}
            label="Label"
            labelText="or drag and drop here"
            linkText="Upload your file"
            name="attachmentsWarning"
            validationText={`This is ${state} validation text. Long validation text to show how it wraps.`}
            validationState={state}
            hasValidationIcon
            isRequired
          />
          <UNSTABLE_FileUploadAttachments
            id={`file-uploader-${state}-validation-attachment-icon`}
            label="Attachments"
          />
        </UNSTABLE_FileUpload>
      ))}
    </>
  );
};

export default FileUploadInputValidationWithIcon;
