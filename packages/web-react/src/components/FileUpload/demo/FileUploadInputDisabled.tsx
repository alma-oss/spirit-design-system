import React from 'react';
import { Grid } from '../../Grid';
import { FileUpload } from '..';

const FileUploadInputDisabled = () => (
  <Grid cols={{ mobile: 1, tablet: 2 }}>
    <FileUpload
      rootId="example-disabled-standard"
      id="file-uploader-disabled-standard"
      helperText="Max file size is 10 MB"
      label="Label"
      inputUploadText="Upload your file"
      inputDragAndDropText="or drag and drop here"
      name="attachment-disabled-standard"
      isDisabled
      isRequired
    />
    <FileUpload
      rootId="example-disabled-compact"
      id="file-uploader-disabled-compact"
      helperText="Max file size is 10 MB"
      isCompact
      label="Label"
      inputUploadText="Upload your file"
      inputDragAndDropText="or drag and drop here"
      name="attachment-disabled-compact"
      isDisabled
      isRequired
    />
  </Grid>
);

export default FileUploadInputDisabled;
