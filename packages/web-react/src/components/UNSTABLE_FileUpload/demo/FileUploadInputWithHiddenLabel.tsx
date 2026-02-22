import React from 'react';
import {
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
  UNSTABLE_FileUploadInput,
} from '..';
import { useFileUploaderDemo } from './useFileUploaderDemo';

const FileUploadInputWithHiddenLabel = () => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(false);

  return (
    <UNSTABLE_FileUpload id="file-uploader-hidden-label">
      <UNSTABLE_FileUploadInput
        helperText="Max file size is 10 MB"
        id="file-uploader-hidden-label-input"
        isLabelHidden
        label="Upload files"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
        onFilesSelected={onFilesSelected}
      />
      <UNSTABLE_FileUploadAttachments id="file-uploader-hidden-label-attachment" label="Attachments">
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

export default FileUploadInputWithHiddenLabel;
