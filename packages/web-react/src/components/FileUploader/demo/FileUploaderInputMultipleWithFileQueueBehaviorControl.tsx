import React from 'react';
import { type SpiritFileUploaderAttachmentProps } from '../../../types';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const FileUploaderInputMultipleWithFileQueueBehaviorControl = () => {
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
      id="file-uploader-multiple-with-queue-behavior-control"
      onDismiss={onDismiss}
      updateQueue={updateQueue}
    >
      <FileUploaderInput
        accept=".png,image/jpeg"
        helperText="Max size of each file is 10 MB"
        id="file-uploader-multiple-with-queue-behavior-control-input"
        isMultiple
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file(s)"
        maxUploadedFiles={2}
        name="attachments"
        onError={(error) => console.error('My error log', error)}
        queueLimitBehavior="hide"
      />
      <FileUploaderList
        attachmentComponent={attachmentComponent}
        id="file-uploader-multiple-with-queue-behavior-control-attachment"
        inputName="attachments"
        label="Attachments"
      />
    </FileUploader>
  );
};

export default FileUploaderInputMultipleWithFileQueueBehaviorControl;
