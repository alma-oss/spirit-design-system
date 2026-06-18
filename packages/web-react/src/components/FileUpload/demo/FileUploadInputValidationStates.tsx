import React from 'react';
import { ValidationStates } from '../../../constants';
import { Grid } from '../../Grid';
import { FileUpload } from '..';

const states = Object.values(ValidationStates);

const FileUploadInputValidationStates = () => (
  <>
    {states.map((state) => (
      <Grid key={state} cols={{ mobile: 1, tablet: 2 }}>
        <FileUpload
          rootId={`example-validation-standard-${state}`}
          id={`file-uploader-standard-${state}`}
          helperText="Max file size is 10 MB"
          label="Label"
          inputUploadText="Upload your file"
          inputDragAndDropText="or drag and drop here"
          name={`attachment-standard-${state}`}
          validationText={
            state === ValidationStates.DANGER
              ? ['This is danger validation text.', 'Another danger validation text.']
              : `This is ${state} validation text.`
          }
          validationState={state}
        />
        <FileUpload
          rootId={`example-validation-compact-${state}`}
          id={`file-uploader-compact-${state}`}
          helperText="Max file size is 10 MB"
          isCompact
          label="Label"
          inputUploadText="Upload your file"
          inputDragAndDropText="or drag and drop here"
          name={`attachment-compact-${state}`}
          validationText={
            state === ValidationStates.DANGER
              ? ['This is danger validation text.', 'Another danger validation text.']
              : `This is ${state} validation text.`
          }
          validationState={state}
        />
      </Grid>
    ))}
  </>
);

export default FileUploadInputValidationStates;
