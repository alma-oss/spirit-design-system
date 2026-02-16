import React from 'react';
import {
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
  UNSTABLE_FileUploadInput,
} from '..';
import { useFileUploaderDemo } from './useFileUploaderDemo';

const FileUploadInputMultiple = () => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(true);

  return (
    <UNSTABLE_FileUpload id="file-uploader-multiple">
      <UNSTABLE_FileUploadInput
        helperText="Max file size is 10 MB. You can select multiple files."
        id="file-uploader-multiple-input"
        isMultiple
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your files"
        name="attachments"
        onFilesSelected={onFilesSelected}
      />
      <UNSTABLE_FileUploadAttachments id="file-uploader-multiple-attachment" label="Attachments">
        {items.map((item) => (
          <UNSTABLE_FileUploadAttachment
            key={item.id}
            id={item.id}
            label={item.label}
            onDismiss={() => onDismiss(item.id)}
          />
        ))}
      </UNSTABLE_FileUploadAttachments>
    </UNSTABLE_FileUpload>
  );
};

export default FileUploadInputMultiple;
