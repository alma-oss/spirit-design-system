import React from 'react';
import { Grid } from '../../Grid';
import { FileUpload } from '..';

const FileUploadUploadDisabled = () => (
  <Grid cols={{ mobile: 1, tablet: 2 }}>
    <FileUpload
      rootId="example-upload-disabled-standard"
      id="file-uploader-upload-disabled-standard"
      helperText="Max file size is 10 MB"
      label="Label"
      inputUploadText="Upload your file"
      inputDragAndDropText="or drag and drop here"
      name="attachment-upload-disabled-standard"
      isUploadDisabled
      isRequired
    />
    <FileUpload
      rootId="example-upload-disabled-compact"
      id="file-uploader-upload-disabled-compact"
      helperText="Max file size is 10 MB"
      isCompact
      label="Label"
      inputUploadText="Upload your file"
      inputDragAndDropText="or drag and drop here"
      name="attachment-upload-disabled-compact"
      isUploadDisabled
      isRequired
    />
  </Grid>
);

export default FileUploadUploadDisabled;
