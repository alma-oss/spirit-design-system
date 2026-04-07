import React from 'react';
import { UNSTABLE_FileUpload } from '..';

const FileUploadDraggingNotAvailable = () => (
  // ⚠️ VISUAL EXAMPLE ONLY – shows how the input looks when drag-and-drop is not supported. No files are added.
  <div className="Grid Grid--alignmentXStretch Grid--alignmentYStretch Grid--tablet--cols-2 Grid--cols-1">
    <UNSTABLE_FileUpload
      rootId="example-no-drag-standard"
      id="file-uploader-no-drag-standard"
      helperText="Max file size is 10 MB"
      isDragAndDropSupported={false}
      isRequired
      label="Label"
      linkText="Upload your file"
      name="attachment-no-drag-standard"
    />
    <UNSTABLE_FileUpload
      rootId="example-no-drag-compact"
      id="file-uploader-no-drag-compact"
      helperText="Max file size is 10 MB"
      isCompact
      isDragAndDropSupported={false}
      isRequired
      label="Label"
      linkText="Upload your file"
      name="attachment-no-drag-compact"
    />
  </div>
);

export default FileUploadDraggingNotAvailable;
