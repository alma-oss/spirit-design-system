import React from 'react';
import { UNSTABLE_FileUpload, UNSTABLE_FileUploadAttachments, UNSTABLE_FileUploadInput } from '..';

const FileUploadInputValidationStates = () => (
  <>
    <UNSTABLE_FileUpload id="file-uploader-validation-states-success">
      <UNSTABLE_FileUploadInput
        helperText="Max file size is 10 MB"
        id="file-uploader-validation-states-success-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachmentsSuccess"
        validationText="Success validation text"
        validationState="success"
        isRequired
      />
      <UNSTABLE_FileUploadAttachments id="file-uploader-validation-states-success-attachment" label="Attachments" />
    </UNSTABLE_FileUpload>

    <UNSTABLE_FileUpload id="file-uploader-validation-states-warning">
      <UNSTABLE_FileUploadInput
        helperText="Max file size is 10 MB"
        id="file-uploader-validation-states-warning-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachmentsWarning"
        validationText="Warning validation text"
        validationState="warning"
        isRequired
      />
      <UNSTABLE_FileUploadAttachments id="file-uploader-validation-states-warning-attachment" label="Attachments" />
    </UNSTABLE_FileUpload>

    <UNSTABLE_FileUpload id="file-uploader-validation-states-danger">
      <UNSTABLE_FileUploadInput
        helperText="Max file size is 10 MB"
        id="file-uploader-validation-states-danger-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachmentsDanger"
        validationText={['Danger validation text', 'Another danger validation text']}
        validationState="danger"
        isRequired
      />
      <UNSTABLE_FileUploadAttachments id="file-uploader-validation-states-danger-attachment" label="Attachments" />
    </UNSTABLE_FileUpload>
  </>
);

export default FileUploadInputValidationStates;
