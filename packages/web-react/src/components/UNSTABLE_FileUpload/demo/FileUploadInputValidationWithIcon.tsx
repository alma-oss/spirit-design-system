import React from 'react';
import { ValidationStates } from '../../../constants';
import { UNSTABLE_FileUpload } from '..';

const FileUploadInputValidationWithIcon = () => {
  const states = Object.values(ValidationStates);

  return (
    <>
      {states.map((state) => (
        <div
          key={`file-uploader-${state}-validation-icon`}
          className="Grid Grid--alignmentXStretch Grid--alignmentYStretch Grid--tablet--cols-2 Grid--cols-1"
        >
          <UNSTABLE_FileUpload
            rootId={`example-validation-icon-standard-${state}`}
            id={`file-uploader-icon-standard-${state}`}
            helperText="Max file size is 10 MB"
            label="Label"
            labelText="or drag and drop here"
            linkText="Upload your file"
            name={`attachment-icon-standard-${state}`}
            validationText={`This is ${state} validation text. Long validation text to show how it wraps.`}
            validationState={state}
            hasValidationIcon
            isRequired
          />
          <UNSTABLE_FileUpload
            rootId={`example-validation-icon-compact-${state}`}
            id={`file-uploader-icon-compact-${state}`}
            helperText="Max file size is 10 MB"
            isCompact
            label="Label"
            labelText="or drag and drop here"
            linkText="Upload your file"
            name={`attachment-icon-compact-${state}`}
            validationText={`This is ${state} validation text. Long validation text to show how it wraps.`}
            validationState={state}
            hasValidationIcon
            isRequired
          />
        </div>
      ))}
    </>
  );
};

export default FileUploadInputValidationWithIcon;
