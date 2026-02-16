import React from 'react';
import { UNSTABLE_FileUpload, UNSTABLE_FileUploadAttachment, UNSTABLE_FileUploadInput } from '..';
import { visualOnlyNoopOnDismiss } from './visualOnlyContext';

const FileUploadInputWithAttachment = () => (
  <>
    {/* ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE */}
    <UNSTABLE_FileUpload id="file-uploader-input-with-attachment">
      <UNSTABLE_FileUploadInput
        helperText="Max file size is 10 MB"
        id="file-uploader-input-with-attachment-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
      />
      <ul className="FileUploaderList">
        <UNSTABLE_FileUploadAttachment id="attachment-1" label="My resume.docx" onDismiss={visualOnlyNoopOnDismiss} />
      </ul>
    </UNSTABLE_FileUpload>

    {/* ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE */}
    <UNSTABLE_FileUpload id="file-uploader-input-with-attachment-validation-state">
      <UNSTABLE_FileUploadInput
        helperText="Max file size is 10 MB"
        id="file-uploader-input-with-attachment-validation-state-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
        validationText="Danger validation text"
        validationState="danger"
      />
      <ul className="FileUploaderList">
        <UNSTABLE_FileUploadAttachment id="attachment-2" label="My resume.docx" onDismiss={visualOnlyNoopOnDismiss} />
        <UNSTABLE_FileUploadAttachment
          id="attachment-3"
          label="My resume with a name that is too long so it needs to be trimmed. You're not gonna see this part!.pdf"
          onDismiss={visualOnlyNoopOnDismiss}
        />
      </ul>
    </UNSTABLE_FileUpload>
  </>
);

export default FileUploadInputWithAttachment;
