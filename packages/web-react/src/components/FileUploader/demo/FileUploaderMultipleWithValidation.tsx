import React from 'react';
import { type SpiritFileUploaderAttachmentProps } from '../../../types';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const FileUploaderMultipleWithValidation = () => {
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
      id="file-uploader-multiple-with-validation"
      onDismiss={onDismiss}
      updateQueue={updateQueue}
    >
      <FileUploaderInput
        accept=".png,image/jpeg"
        helperText="Only JPG and PNG images are allowed. Max size of each file is 10 MB"
        id="file-uploader-multiple-with-validation-input"
        isMultiple
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file(s)"
        name="attachments"
        maxUploadedFiles={2}
        onError={(error) => console.error('My error log', error)}
      />
      <FileUploaderList
        attachmentComponent={attachmentComponent}
        id="file-uploader-multiple-with-validation-attachment"
        inputName="attachments"
        label="Attachments"
      />
    </FileUploader>
  );
};

export default FileUploaderMultipleWithValidation;
