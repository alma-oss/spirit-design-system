import React from 'react';
import { UNSTABLE_FileUpload, UNSTABLE_FileUploadAttachment, UNSTABLE_FileUploadInput } from '..';
import { visualOnlyNoopOnDismiss } from './visualOnlyContext';

const FileUploadFluidWidth = () => (
  // ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE
  <UNSTABLE_FileUpload id="file-uploader-fluid-width" isFluid>
    <UNSTABLE_FileUploadInput
      helperText="Max file size is 10 MB"
      id="file-uploader-fluid-width-input"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachments"
    />
    <ul className="FileUploaderList">
      <UNSTABLE_FileUploadAttachment id="attachment-1" label="My resume.docx" onDismiss={visualOnlyNoopOnDismiss} />
    </ul>
  </UNSTABLE_FileUpload>
);

export default FileUploadFluidWidth;
