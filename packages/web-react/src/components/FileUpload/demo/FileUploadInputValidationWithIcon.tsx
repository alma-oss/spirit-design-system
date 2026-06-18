import React from 'react';
import { ValidationStates } from '../../../constants';
import { Grid } from '../../Grid';
import { FileUpload } from '..';

const FileUploadInputValidationWithIcon = () => {
  const states = Object.values(ValidationStates);

  return (
    <>
      {states.map((state) => (
        <Grid key={`file-uploader-${state}-validation-icon`} cols={{ mobile: 1, tablet: 2 }}>
          <FileUpload
            rootId={`example-validation-icon-standard-${state}`}
            id={`file-uploader-icon-standard-${state}`}
            helperText="Max file size is 10 MB"
            label="Label"
            inputUploadText="Upload your file"
            inputDragAndDropText="or drag and drop here"
            name={`attachment-icon-standard-${state}`}
            validationText={`This is ${state} validation text. Long validation text to show how it wraps.`}
            validationState={state}
            hasValidationIcon
            isRequired
          />
          <FileUpload
            rootId={`example-validation-icon-compact-${state}`}
            id={`file-uploader-icon-compact-${state}`}
            helperText="Max file size is 10 MB"
            isCompact
            label="Label"
            inputUploadText="Upload your file"
            inputDragAndDropText="or drag and drop here"
            name={`attachment-icon-compact-${state}`}
            validationText={`This is ${state} validation text. Long validation text to show how it wraps.`}
            validationState={state}
            hasValidationIcon
            isRequired
          />
        </Grid>
      ))}
    </>
  );
};

export default FileUploadInputValidationWithIcon;
