import React from 'react';
import { Stack } from '../..';
import { UNSTABLE_Attachment } from '../../UNSTABLE_Attachment';
import { UNSTABLE_FileUpload } from '..';
import { visualOnlyNoopOnDismiss } from './visualOnlyContext';

const FileUploadInputWithAttachment = () => (
  <>
    {/* ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE */}
    <UNSTABLE_FileUpload
      id="file-uploader-input-with-attachment"
      helperText="Max file size is 10 MB"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachments"
    />
    <Stack aria-label="Attachments" elementType="ul" hasSpacing>
      <UNSTABLE_Attachment id="attachment-1" label="My resume.docx" onDismiss={visualOnlyNoopOnDismiss} />
    </Stack>

    {/* ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE */}
    <UNSTABLE_FileUpload
      id="file-uploader-input-with-attachment-validation-state"
      helperText="Max file size is 10 MB"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachments"
      validationText="Danger validation text"
      validationState="danger"
    />
    <Stack aria-label="Attachments" elementType="ul" hasSpacing>
      <UNSTABLE_Attachment id="attachment-2" label="My resume.docx" onDismiss={visualOnlyNoopOnDismiss} />
      <UNSTABLE_Attachment
        id="attachment-3"
        label="My resume with a name that is too long so it needs to be trimmed. You're not gonna see this part!.pdf"
        onDismiss={visualOnlyNoopOnDismiss}
      />
    </Stack>
  </>
);

export default FileUploadInputWithAttachment;
