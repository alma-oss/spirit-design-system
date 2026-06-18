import React from 'react';
import { Grid } from '../../Grid';
import { FileUpload } from '..';

const FileUploadDraggingNotAvailable = () => (
  // ⚠️ VISUAL EXAMPLE ONLY – shows how the input looks when drag-and-drop is not supported. No files are added.
  <Grid cols={{ mobile: 1, tablet: 2 }}>
    <FileUpload
      rootId="example-no-drag-standard"
      id="file-uploader-no-drag-standard"
      helperText="Max file size is 10 MB"
      isDragAndDropSupported={false}
      isRequired
      label="Label"
      inputUploadText="Upload your file"
      name="attachment-no-drag-standard"
    />
    <FileUpload
      rootId="example-no-drag-compact"
      id="file-uploader-no-drag-compact"
      helperText="Max file size is 10 MB"
      isCompact
      isDragAndDropSupported={false}
      isRequired
      label="Label"
      inputUploadText="Upload your file"
      name="attachment-no-drag-compact"
    />
  </Grid>
);

export default FileUploadDraggingNotAvailable;
