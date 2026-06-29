import React from 'react';
import { File, FileImagePreview } from '../../File';
import { Icon } from '../../Icon';
import { Stack } from '../../Stack';
import { FileUpload } from '..';
import { visualOnlyNoopOnDismiss } from './visualOnlyContext';

const FileUploadInputWithAttachment = () => (
  <Stack spacing="space-800">
    <FileUpload
      rootId="example-with-file-list"
      id="file-uploader-with-list"
      helperText="Max file size is 10 MB"
      label="Upload files"
      inputUploadText="Upload your file"
      inputDragAndDropText="or drag and drop here"
      name="attachment-with-list"
      isMultiple
    />
    <Stack aria-label="Uploaded files" elementType="ul" spacing="space-700">
      <File
        label="Document.pdf"
        helperText="2.5 MB"
        editText="Edit file name Document.pdf"
        removeText="Remove file Document.pdf from list"
        onDismiss={visualOnlyNoopOnDismiss}
        onChange={() => {}}
      />
      <File
        label="vacation-photo.jpg"
        helperText={
          <>
            <Icon name="spinner" boxSize={16} UNSAFE_className="animation-spin-clockwise" />{' '}
            <span>Uploading your file…</span>
          </>
        }
        removeText="Remove file vacation-photo.jpg from list"
        onDismiss={visualOnlyNoopOnDismiss}
        previewSlot={<FileImagePreview imagePreview="https://picsum.photos/seed/upload1/48/48" label="Image preview" />}
      />
      <File
        label="report-2024.xlsx"
        validationState="success"
        hasValidationIcon
        validationText="File uploaded successfully"
        removeText="Remove file report-2024.xlsx from list"
        onDismiss={visualOnlyNoopOnDismiss}
      />
      <File
        label="large-file.zip"
        validationState="danger"
        hasValidationIcon
        validationText="File upload error – please retry"
        removeText="Remove file large-file.zip from list"
        onDismiss={visualOnlyNoopOnDismiss}
      />
    </Stack>
  </Stack>
);

export default FileUploadInputWithAttachment;
