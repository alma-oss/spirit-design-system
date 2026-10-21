import { FileUpload } from '@alma-oss/spirit-web-react';
import React from 'react';

const FileUploadPreview = () => (
  <FileUpload
    isCompact
    isDragAndDropSupported
    isLabelHidden
    buttonText="Browse"
    helperText="Max file size is 10 MB"
    id="card-file-upload"
    inputDragAndDropText="or drag and drop here"
    inputUploadText="Upload your file"
    label="Attachment"
    name="card-attachment"
    UNSAFE_style={{ width: 360 }}
  />
);

export default FileUploadPreview;
