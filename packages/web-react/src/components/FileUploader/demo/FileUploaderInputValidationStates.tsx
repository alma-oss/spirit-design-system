import React from 'react';
import { type SpiritFileUploaderAttachmentProps } from '../../../types';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const FileUploaderInputValidationStates = () => {
  const {
    fileQueue: fileQueueSuccess,
    addToQueue: addToQueueSuccess,
    clearQueue: clearQueueSuccess,
    onDismiss: onDismissSuccess,
    findInQueue: findInQueueSuccess,
    updateQueue: updateQueueSuccess,
  } = useFileQueue();

  const {
    fileQueue: fileQueueWarning,
    addToQueue: addToQueueWarning,
    clearQueue: clearQueueWarning,
    onDismiss: onDismissWarning,
    findInQueue: findInQueueWarning,
    updateQueue: updateQueueWarning,
  } = useFileQueue();

  const {
    fileQueue: fileQueueDanger,
    addToQueue: addToQueueDanger,
    clearQueue: clearQueueDanger,
    onDismiss: onDismissDanger,
    findInQueue: findInQueueDanger,
    updateQueue: updateQueueDanger,
  } = useFileQueue();

  const attachmentComponent = ({ id, ...props }: SpiritFileUploaderAttachmentProps) => (
    <FileUploaderAttachment key={id} id={id} {...props} />
  );

  return (
    <>
      <FileUploader
        addToQueue={addToQueueSuccess}
        clearQueue={clearQueueSuccess}
        fileQueue={fileQueueSuccess}
        findInQueue={findInQueueSuccess}
        id="file-uploader-validation-states-success"
        onDismiss={onDismissSuccess}
        updateQueue={updateQueueSuccess}
      >
        <FileUploaderInput
          helperText="Max file size is 10 MB"
          id="file-uploader-validation-states-success-input"
          label="Label"
          labelText="or drag and drop here"
          linkText="Upload your file"
          name="attachmentsSuccess"
          onError={(error) => console.error('My error log', error)}
          validationText="Success validation text"
          validationState="success"
          isRequired
        />
        <FileUploaderList
          attachmentComponent={attachmentComponent}
          id="file-uploader-validation-states-success-attachment"
          inputName="attachmentsSuccess"
          label="Attachments"
        />
      </FileUploader>

      <FileUploader
        addToQueue={addToQueueWarning}
        clearQueue={clearQueueWarning}
        fileQueue={fileQueueWarning}
        findInQueue={findInQueueWarning}
        id="file-uploader-validation-states-warning"
        onDismiss={onDismissWarning}
        updateQueue={updateQueueWarning}
      >
        <FileUploaderInput
          helperText="Max file size is 10 MB"
          id="file-uploader-validation-states-warning-input"
          label="Label"
          labelText="or drag and drop here"
          linkText="Upload your file"
          name="attachmentsWarning"
          onError={(error) => console.error('My error log', error)}
          validationText="Warning validation text"
          validationState="warning"
          isRequired
        />
        <FileUploaderList
          attachmentComponent={attachmentComponent}
          id="file-uploader-validation-states-warning-attachment"
          inputName="attachmentsWarning"
          label="Attachments"
        />
      </FileUploader>

      <FileUploader
        addToQueue={addToQueueDanger}
        clearQueue={clearQueueDanger}
        fileQueue={fileQueueDanger}
        findInQueue={findInQueueDanger}
        id="file-uploader-validation-states-danger"
        onDismiss={onDismissDanger}
        updateQueue={updateQueueDanger}
      >
        <FileUploaderInput
          helperText="Max file size is 10 MB"
          id="file-uploader-validation-states-danger-input"
          label="Label"
          labelText="or drag and drop here"
          linkText="Upload your file"
          name="attachmentsDanger"
          onError={(error) => console.error('My error log', error)}
          validationText={['Danger validation text', 'Another danger validation text']}
          validationState="danger"
          isRequired
        />
        <FileUploaderList
          attachmentComponent={attachmentComponent}
          id="file-uploader-validation-states-danger-attachment"
          inputName="attachmentsDanger"
          label="Attachments"
        />
      </FileUploader>
    </>
  );
};

export default FileUploaderInputValidationStates;
