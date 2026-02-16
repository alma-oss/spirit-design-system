import React from 'react';
import { Stack } from '../..';
import { UNSTABLE_Attachment } from '../../UNSTABLE_Attachment';
import { UNSTABLE_FileUpload } from '..';
import { useFileUploaderDemo } from './useFileUploaderDemo';

const FileUploadInputMultiple = () => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(true);

  return (
    <>
      <UNSTABLE_FileUpload
        id="file-uploader-multiple"
        helperText="Max file size is 10 MB. You can select multiple files."
        isMultiple
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your files"
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

export default FileUploadInputMultiple;
