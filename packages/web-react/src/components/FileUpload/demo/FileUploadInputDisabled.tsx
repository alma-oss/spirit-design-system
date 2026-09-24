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
      name="attachment-disabled-standard"
      isDisabled
      isRequired
      strings={{
        label: {
          upload: 'Upload your file',
          dragAndDrop: 'or drag and drop here',
        },
      }}
    />
    <FileUpload
      rootId="example-disabled-compact"
      id="file-uploader-disabled-compact"
      helperText="Max file size is 10 MB"
      isCompact
      label="Label"
      name="attachment-disabled-compact"
      isDisabled
      isRequired
      strings={{
        label: {
          upload: 'Upload your file',
          dragAndDrop: 'or drag and drop here',
        },
      }}
    />
  </Grid>
);

export default FileUploadInputDisabled;
