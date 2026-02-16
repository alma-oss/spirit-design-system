import React from 'react';
import { UNSTABLE_FileUpload } from '..';

const FileUploadFluidWidth = () => (
  // ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE
  <UNSTABLE_FileUpload
    id="file-uploader-fluid-width"
    isFluid
    helperText="Max file size is 10 MB"
    label="Label"
    labelText="or drag and drop here"
    linkText="Upload your file"
    name="attachments"
  />
);

export default FileUploadFluidWidth;
