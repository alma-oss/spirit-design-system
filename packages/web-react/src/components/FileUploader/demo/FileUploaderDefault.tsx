import React from 'react';
import { type SpiritFileUploaderAttachmentProps } from '../../../types';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const FileUploaderDefault = () => {
  const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();

  const attachmentComponent = ({ id, ...props }: SpiritFileUploaderAttachmentProps) => (
    <FileUploaderAttachment key={id} id={id} {...props} />
  );

  return (
    <FileUploader
      addToQueue={addToQueue}
      clearQueue={clearQueue}
      fileQueue={fileQueue}
      findInQueue={findInQueue}
      id="file-uploader-default"
      onDismiss={onDismiss}
      updateQueue={updateQueue}
    >
      <FileUploaderInput
        helperText="Max file size is 10 MB"
        id="file-uploader-default-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
        onError={(error) => console.error('My error log', error)}
      />
      <FileUploaderList
        attachmentComponent={attachmentComponent}
        id="file-uploader-default-attachment"
        inputName="attachments"
        label="Attachments"
      />
    </FileUploader>
  );
};

export default FileUploaderDefault;
