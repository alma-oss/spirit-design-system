import React from 'react';
import { ValidationStates } from '../../../constants';
import { type SpiritFileUploaderAttachmentProps } from '../../../types';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const FileUploaderInputValidationWithIcon = () => {
  const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();
  const attachmentComponent = ({ id, ...props }: SpiritFileUploaderAttachmentProps) => (
    <FileUploaderAttachment key={id} id={id} {...props} />
  );

  const states = Object.values(ValidationStates);

  return (
    <>
      {states.map((state) => (
        <FileUploader
          addToQueue={addToQueue}
          clearQueue={clearQueue}
          fileQueue={fileQueue}
          findInQueue={findInQueue}
          id={`file-uploader-${state}-validation-icon`}
          onDismiss={onDismiss}
          updateQueue={updateQueue}
          key={`file-uploader-${state}-validation-icon`}
        >
          <FileUploaderInput
            helperText="Max file size is 10 MB"
            id={`file-uploader-${state}-validation-input-icon`}
            label="Label"
            labelText="or drag and drop here"
            linkText="Upload your file"
            name="attachmentsWarning"
            onError={(error) => console.error('My error log', error)}
            validationText={`This is ${state} validation text. Long validation text to show how it wraps.`}
            validationState={state}
            hasValidationIcon
            isRequired
          />
          <FileUploaderList
            attachmentComponent={attachmentComponent}
            id={`file-uploader-${state}-validation-attachment-icon`}
            inputName="attachmentsWarning"
            label="Attachments"
          />
        </FileUploader>
      ))}
    </>
  );
};

export default FileUploaderInputValidationWithIcon;
