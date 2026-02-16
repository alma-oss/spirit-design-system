import React from 'react';
import { UNSTABLE_FileUpload, UNSTABLE_FileUploadAttachments, UNSTABLE_FileUploadInput } from '..';

const FileUploadInputDisabled = () => (
  <UNSTABLE_FileUpload id="file-uploader-disabled">
    <UNSTABLE_FileUploadInput
      helperText="Max file size is 10 MB"
      id="file-uploader-disabled-input"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachments"
      isDisabled
      isRequired
    />
    <UNSTABLE_FileUploadAttachments id="file-uploader-disabled-attachment" label="Attachments" />
  </UNSTABLE_FileUpload>
);

export default FileUploadInputDisabled;
