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
      name="attachment-with-list"
      isMultiple
      strings={{
        label: {
          upload: 'Upload your file',
          dragAndDrop: 'or drag and drop here',
        },
      }}
    />
    <Stack aria-label="Uploaded files" elementType="ul" spacing="space-700">
      <File
        label="Document.pdf"
        helperText="2.5 MB"
        onDismiss={visualOnlyNoopOnDismiss}
        onChange={() => {}}
        strings={{ ariaLabel: { edit: 'Edit file name Document.pdf', remove: 'Remove file Document.pdf from list' } }}
      />
      <File
        label="vacation-photo.jpg"
        helperText={
          <>
            <Icon name="spinner" boxSize={16} UNSAFE_className="animation-spin-clockwise" />{' '}
            <span>Uploading your file…</span>
          </>
        }
        onDismiss={visualOnlyNoopOnDismiss}
        previewSlot={<FileImagePreview imagePreview="https://picsum.photos/seed/upload1/48/48" label="Image preview" />}
        strings={{ ariaLabel: { remove: 'Remove file vacation-photo.jpg from list' } }}
      />
      <File
        label="report-2024.xlsx"
        validationState="success"
        hasValidationIcon
        validationText="File uploaded successfully"
        onDismiss={visualOnlyNoopOnDismiss}
        strings={{ ariaLabel: { remove: 'Remove file report-2024.xlsx from list' } }}
      />
      <File
        label="large-file.zip"
        validationState="danger"
        hasValidationIcon
        validationText="File upload error – please retry"
        onDismiss={visualOnlyNoopOnDismiss}
        strings={{ ariaLabel: { remove: 'Remove file large-file.zip from list' } }}
      />
    </Stack>
  </Stack>
);

export default FileUploadInputWithAttachment;
