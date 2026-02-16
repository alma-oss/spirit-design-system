import React from 'react';
import { Stack } from '../..';
import { UNSTABLE_Attachment } from '../../UNSTABLE_Attachment';
import { UNSTABLE_FileUpload } from '..';
import { useFileUploaderDemo } from './useFileUploaderDemo';

const FileUploadInputWithHiddenLabel = () => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(false);

  return (
    <>
      <UNSTABLE_FileUpload
        id="file-uploader-hidden-label"
        helperText="Max file size is 10 MB"
        isLabelHidden
        label="Upload files"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
        onFilesSelected={onFilesSelected}
      />
      <Stack aria-label="Attachments" elementType="ul" hasSpacing>
        {items.map((item) => (
          <UNSTABLE_Attachment key={item.id} id={item.id} label={item.label} onDismiss={() => onDismiss(item.id)} />
        ))}
      </Stack>
    </>
  );
};

export default FileUploadInputWithHiddenLabel;
