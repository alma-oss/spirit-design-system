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
      name="attachment-no-drag-standard"
      strings={{
        label: { upload: 'Upload your file' },
      }}
    />
    <FileUpload
      rootId="example-no-drag-compact"
      id="file-uploader-no-drag-compact"
      helperText="Max file size is 10 MB"
      isCompact
      isDragAndDropSupported={false}
      isRequired
      label="Label"
      name="attachment-no-drag-compact"
      strings={{
        label: { upload: 'Upload your file' },
      }}
    />
  </Grid>
);

export default FileUploadDraggingNotAvailable;
