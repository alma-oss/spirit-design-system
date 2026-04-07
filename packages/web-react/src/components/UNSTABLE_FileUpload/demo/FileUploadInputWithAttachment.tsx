import React from 'react';
import { Stack } from '../..';
import { Icon } from '../../Icon';
import { UNSTABLE_File, UNSTABLE_FileImagePreview } from '../../UNSTABLE_File';
import { UNSTABLE_FileUpload } from '..';
import { visualOnlyNoopOnDismiss } from './visualOnlyContext';

const FileUploadInputWithAttachment = () => (
  <div className="docs-Stack docs-Stack--stretch">
    <UNSTABLE_FileUpload
      rootId="example-with-file-list"
      id="file-uploader-with-list"
      helperText="Max file size is 10 MB"
      label="Upload files"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachment-with-list"
      isMultiple
    />
    <Stack aria-label="Uploaded files" elementType="ul" hasSpacing>
      <UNSTABLE_File
        label="Document.pdf"
        helperText="2.5 MB"
        editText="Edit file name Document.pdf"
        removeText="Remove file Document.pdf from list"
        onDismiss={visualOnlyNoopOnDismiss}
        onChange={() => {}}
      />
      <UNSTABLE_File
        label="vacation-photo.jpg"
        helperText={
          <>
            <Icon name="spinner" boxSize={16} UNSAFE_className="animation-spin-clockwise" />{' '}
            <span>Uploading your file…</span>
          </>
        }
        removeText="Remove file vacation-photo.jpg from list"
        onDismiss={visualOnlyNoopOnDismiss}
        previewSlot={
          <UNSTABLE_FileImagePreview imagePreview="https://picsum.photos/seed/upload1/48/48" label="Image preview" />
        }
      />
      <UNSTABLE_File
        label="report-2024.xlsx"
        validationState="success"
        hasValidationIcon
        validationText="File uploaded successfully"
        removeText="Remove file report-2024.xlsx from list"
        onDismiss={visualOnlyNoopOnDismiss}
      />
      <UNSTABLE_File
        label="large-file.zip"
        validationState="danger"
        hasValidationIcon
        validationText="File upload error – please retry"
        removeText="Remove file large-file.zip from list"
        onDismiss={visualOnlyNoopOnDismiss}
      />
    </Stack>
  </div>
);

export default FileUploadInputWithAttachment;
