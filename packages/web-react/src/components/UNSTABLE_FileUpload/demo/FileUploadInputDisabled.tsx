import React from 'react';
import { Grid } from '../../Grid';
import { UNSTABLE_FileUpload } from '..';

const FileUploadInputDisabled = () => (
  <Grid cols={{ mobile: 1, tablet: 2 }}>
    <UNSTABLE_FileUpload
      rootId="example-disabled-standard"
      id="file-uploader-disabled-standard"
      helperText="Max file size is 10 MB"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachment-disabled-standard"
      isDisabled
      isRequired
    />
    <UNSTABLE_FileUpload
      rootId="example-disabled-compact"
      id="file-uploader-disabled-compact"
      helperText="Max file size is 10 MB"
      isCompact
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachment-disabled-compact"
      isDisabled
      isRequired
    />
  </Grid>
);

export default FileUploadInputDisabled;
