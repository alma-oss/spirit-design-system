import React from 'react';
import { Grid } from '../../Grid';
import { UNSTABLE_FileUpload } from '..';

const FileUploadUploadDisabled = () => (
  <Grid cols={{ mobile: 1, tablet: 2 }}>
    <UNSTABLE_FileUpload
      rootId="example-upload-disabled-standard"
      id="file-uploader-upload-disabled-standard"
      helperText="Max file size is 10 MB"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachment-upload-disabled-standard"
      isUploadDisabled
      isRequired
    />
    <UNSTABLE_FileUpload
      rootId="example-upload-disabled-compact"
      id="file-uploader-upload-disabled-compact"
      helperText="Max file size is 10 MB"
      isCompact
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachment-upload-disabled-compact"
      isUploadDisabled
      isRequired
    />
  </Grid>
);

export default FileUploadUploadDisabled;
