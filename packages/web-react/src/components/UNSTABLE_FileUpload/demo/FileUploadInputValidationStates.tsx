import React from 'react';
import { Stack } from '../..';
import { UNSTABLE_FileUpload } from '..';

const FileUploadInputValidationStates = () => (
  <>
    <UNSTABLE_FileUpload
      id="file-uploader-validation-states-success"
      helperText="Max file size is 10 MB"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachmentsSuccess"
      validationText="Success validation text"
      validationState="success"
      isRequired
    />
    <Stack aria-label="Attachments" elementType="ul" hasSpacing />

    <UNSTABLE_FileUpload
      id="file-uploader-validation-states-warning"
      helperText="Max file size is 10 MB"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachmentsWarning"
      validationText="Warning validation text"
      validationState="warning"
      isRequired
    />
    <Stack aria-label="Attachments" elementType="ul" hasSpacing />

    <UNSTABLE_FileUpload
      id="file-uploader-validation-states-danger"
      helperText="Max file size is 10 MB"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachmentsDanger"
      validationText={['Danger validation text', 'Another danger validation text']}
      validationState="danger"
      isRequired
    />
    <Stack aria-label="Attachments" elementType="ul" hasSpacing />
  </>
);

export default FileUploadInputValidationStates;
