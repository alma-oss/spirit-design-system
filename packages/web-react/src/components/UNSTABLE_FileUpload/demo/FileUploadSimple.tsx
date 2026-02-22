import React from 'react';
import {
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
  UNSTABLE_FileUploadInput,
} from '..';
import { useFileUploaderDemo } from './useFileUploaderDemo';

const FileUploadSimple = () => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(false);

  return (
    <UNSTABLE_FileUpload id="file-uploader-simple">
      <UNSTABLE_FileUploadInput
        helperText="Max file size is 10 MB"
        id="file-uploader-simple-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
        onFilesSelected={onFilesSelected}
      />
      <UNSTABLE_FileUploadAttachments id="file-uploader-simple-attachment" label="Attachments">
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

export default FileUploadSimple;
