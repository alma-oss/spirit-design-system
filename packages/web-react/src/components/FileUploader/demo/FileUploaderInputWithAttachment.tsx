import React from 'react';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, useFileQueue } from '..';

const FileUploaderInputWithAttachment = () => {
  const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();

  return (
    <>
      {/* ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE */}
      <FileUploader
        addToQueue={addToQueue}
        clearQueue={clearQueue}
        fileQueue={fileQueue}
        findInQueue={findInQueue}
        id="file-uploader-input-with-attachment"
        onDismiss={onDismiss}
        updateQueue={updateQueue}
      >
        <FileUploaderInput
          helperText="Max file size is 10 MB"
          id="file-uploader-input-with-attachment-input"
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

      {/* ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE */}
      <FileUploader
        addToQueue={addToQueue}
        clearQueue={clearQueue}
        fileQueue={fileQueue}
        findInQueue={findInQueue}
        id="file-uploader-input-with-attachment-validation-state"
        onDismiss={onDismiss}
        updateQueue={updateQueue}
      >
        <FileUploaderInput
          helperText="Max file size is 10 MB"
          id="file-uploader-input-with-attachment-validation-state-input"
          label="Label"
          labelText="or drag and drop here"
          linkText="Upload your file"
          name="attachments"
          onError={(error) => console.error('My error log', error)}
          validationText="Danger validation text"
          validationState="danger"
        />
        <ul className="FileUploaderList">
          <FileUploaderAttachment
            name="test"
            file={new File([''], 'My resume.docx', { type: '.docx', lastModified: 123456789 })}
            id="attachment-2"
            label="My resume.docx"
            onDismiss={onDismiss}
          />
          <FileUploaderAttachment
            name="test"
            file={new File([''], 'My resume.docx', { type: '.pdf', lastModified: 123456789 })}
            id="attachment-3"
            label="My resume with a name that is too long so it needs to be trimmed. You're not gonna see this part!.pdf"
            onDismiss={onDismiss}
          />
        </ul>
      </FileUploader>
    </>
  );
};

export default FileUploaderInputWithAttachment;
