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
      name="attachment-upload-disabled-standard"
      isUploadDisabled
      isRequired
      strings={{
        labelUpload: 'Upload your file',
        labelDragAndDrop: 'or drag and drop here',
      }}
    />
    <FileUpload
      rootId="example-upload-disabled-compact"
      id="file-uploader-upload-disabled-compact"
      helperText="Max file size is 10 MB"
      isCompact
      label="Label"
      name="attachment-upload-disabled-compact"
      isUploadDisabled
      isRequired
      strings={{
        labelUpload: 'Upload your file',
        labelDragAndDrop: 'or drag and drop here',
      }}
    />
  </Grid>
);

export default FileUploadUploadDisabled;
