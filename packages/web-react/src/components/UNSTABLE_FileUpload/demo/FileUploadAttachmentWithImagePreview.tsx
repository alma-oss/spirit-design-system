import React from 'react';
import {
  UNSTABLE_AttachmentImagePreview,
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
  UNSTABLE_FileUploadInput,
} from '..';
import { useFileUploaderDemo } from './useFileUploaderDemo';

const FileUploadAttachmentWithImagePreview = () => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(true);

  return (
    <UNSTABLE_FileUpload id="file-uploader-attachment-with-image-preview">
      <UNSTABLE_FileUploadInput
        helperText="Max size of each file is 10 MB"
        id="file-uploader-attachment-with-image-preview-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file(s)"
        name="attachments"
        onFilesSelected={onFilesSelected}
        isMultiple
      />
      <UNSTABLE_FileUploadAttachments id="file-uploader-attachment-with-image-preview-attachment" label="Attachments">
        {items.map((item) => (
          <UNSTABLE_FileUploadAttachment
            key={item.id}
            id={item.id}
            label={item.label}
            onDismiss={() => onDismiss(item.id)}
            {...(item.previewUrl && {
              thumbnail: (
                <UNSTABLE_AttachmentImagePreview imagePreview={item.previewUrl} label={item.label} meta={item.meta} />
              ),
            })}
          />
        ))}
      </UNSTABLE_FileUploadAttachments>
    </UNSTABLE_FileUpload>
  );
};

export default FileUploadAttachmentWithImagePreview;
