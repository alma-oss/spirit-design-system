import React, { useCallback, useState } from 'react';
import { Stack } from '../..';
import { UNSTABLE_Attachment, UNSTABLE_AttachmentImagePreview } from '../../UNSTABLE_Attachment';
import { UNSTABLE_FileUpload } from '..';
import { useFileUploaderDemo } from './useFileUploaderDemo';

const isImageFile = (file: File): boolean => file.type.startsWith('image/');

const FileUploadAcceptImagesOnly = () => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const onFilesSelectedImagesOnly = useCallback(
    (files: File[]) => {
      const images = files.filter(isImageFile);
      const rejected = files.filter((file) => !isImageFile(file));

      if (rejected.length > 0) {
        setValidationError(
          rejected.length === 1
            ? 'Only image files are allowed. 1 file was not added.'
            : `Only image files are allowed. ${rejected.length} files were not added.`,
        );
      } else {
        setValidationError(null);
      }

      if (images.length > 0) {
        onFilesSelected(images);
      }
    },
    [onFilesSelected],
  );

  return (
    <>
      <UNSTABLE_FileUpload
        id="file-uploader-accept-images"
        accept="image/*"
        helperText="Only images (PNG, JPEG, GIF, WebP, etc.)"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload image"
        name="attachments"
        onFilesSelected={onFilesSelectedImagesOnly}
        validationState={validationError ? 'danger' : undefined}
        validationText={validationError ?? undefined}
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

export default FileUploadAcceptImagesOnly;
