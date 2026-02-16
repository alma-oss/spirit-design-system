import React from 'react';
import { Stack } from '../..';
import { UNSTABLE_Attachment, UNSTABLE_AttachmentImagePreview } from '../../UNSTABLE_Attachment';
import { UNSTABLE_FileUpload } from '..';
import { useFileUploaderDemo } from './useFileUploaderDemo';

const FileUploadAttachmentWithImagePreview = () => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(true);

  return (
    <>
      <UNSTABLE_FileUpload
        id="file-uploader-attachment-with-image-preview"
        helperText="Max size of each file is 10 MB"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file(s)"
        name="attachments"
        onFilesSelected={onFilesSelected}
        isMultiple
      />
      <Stack aria-label="Attachments" elementType="ul" hasSpacing>
        {items.map((item) => (
          <UNSTABLE_Attachment
            key={item.id}
            id={item.id}
            label={item.label}
            onDismiss={() => onDismiss(item.id)}
            {...(item.previewUrl && {
              previewSlot: (
                <UNSTABLE_AttachmentImagePreview imagePreview={item.previewUrl} label={item.label} meta={item.meta} />
              ),
            })}
          />
        ))}
      </Stack>
    </>
  );
};

export default FileUploadAttachmentWithImagePreview;
