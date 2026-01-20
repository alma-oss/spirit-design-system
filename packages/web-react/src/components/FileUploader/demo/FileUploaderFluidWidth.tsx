import React from 'react';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, useFileQueue } from '..';

const FileUploaderFluidWidth = () => {
  const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();

  // ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE
  return (
    <FileUploader
      addToQueue={addToQueue}
      clearQueue={clearQueue}
      fileQueue={fileQueue}
      findInQueue={findInQueue}
      id="file-uploader-fluid-width"
      onDismiss={onDismiss}
      updateQueue={updateQueue}
      isFluid
    >
      <FileUploaderInput
        helperText="Max file size is 10 MB"
        id="file-uploader-fluid-width-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
        onError={(error) => console.error('My error log', error)}
      />
      <ul className="FileUploaderList">
        <FileUploaderAttachment
          name="test"
          file={new File([''], 'My resume.docx', { type: '.docx', lastModified: 123456789 })}
          id="attachment-1"
          label="My resume.docx"
          onDismiss={onDismiss}
        />
      </ul>
    </FileUploader>
  );
};

export default FileUploaderFluidWidth;
