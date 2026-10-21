import { FileUpload } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const FileUploadPreview: PreviewComponent = () => (
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

FileUploadPreview.guides = PREVIEW_GUIDES.VERTICAL;

export default FileUploadPreview;
