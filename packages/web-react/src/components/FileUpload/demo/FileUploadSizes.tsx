'use client';

import React from 'react';
import { Stack } from '../../Stack';
import { FileUpload } from '..';

const uploadProps = {
  helperText: 'Max file size is 10 MB',
  inputDragAndDropText: 'or drag and drop here',
  inputUploadText: 'Upload your file',
} as const;

const FileUploadSizes = () => (
  <Stack spacing="space-800">
    <FileUpload
      id="file-uploader-size-small"
      label="Small"
      name="fileUploaderSizeSmall"
      size="small"
      {...uploadProps}
    />
    <FileUpload
      id="file-uploader-size-medium"
      label="Medium (default)"
      name="fileUploaderSizeMedium"
      {...uploadProps}
    />
    <FileUpload
      id="file-uploader-size-large"
      label="Large"
      name="fileUploaderSizeLarge"
      size="large"
      {...uploadProps}
    />
  </Stack>
);

export default FileUploadSizes;
