import React from 'react';
import { Stack } from '../..';
import { UNSTABLE_FileUpload } from '..';

const FileUploadInputDisabled = () => (
  <>
    <UNSTABLE_FileUpload
      id="file-uploader-disabled"
      helperText="Max file size is 10 MB"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachments"
      isDisabled
      isRequired
    />
    <Stack aria-label="Attachments" elementType="ul" hasSpacing />
  </>
);

export default FileUploadInputDisabled;
