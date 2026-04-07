import React from 'react';
import { ValidationStates } from '../../../constants';
import { UNSTABLE_FileUpload } from '..';

const states = Object.values(ValidationStates);

const FileUploadInputValidationStates = () => (
  <>
    {states.map((state) => (
      <div
        key={state}
        className="Grid Grid--alignmentXStretch Grid--alignmentYStretch Grid--tablet--cols-2 Grid--cols-1"
      >
        <UNSTABLE_FileUpload
          rootId={`example-validation-standard-${state}`}
          id={`file-uploader-standard-${state}`}
          helperText="Max file size is 10 MB"
          label="Label"
          labelText="or drag and drop here"
          linkText="Upload your file"
          name={`attachment-standard-${state}`}
          validationText={
            state === ValidationStates.DANGER
              ? ['This is danger validation text.', 'Another danger validation text.']
              : `This is ${state} validation text.`
          }
          validationState={state}
        />
        <UNSTABLE_FileUpload
          rootId={`example-validation-compact-${state}`}
          id={`file-uploader-compact-${state}`}
          helperText="Max file size is 10 MB"
          isCompact
          label="Label"
          labelText="or drag and drop here"
          linkText="Upload your file"
          name={`attachment-compact-${state}`}
          validationText={
            state === ValidationStates.DANGER
              ? ['This is danger validation text.', 'Another danger validation text.']
              : `This is ${state} validation text.`
          }
          validationState={state}
        />
      </div>
    ))}
  </>
);

export default FileUploadInputValidationStates;
