import React, { useEffect } from 'react';
import { type SpiritFileUploaderAttachmentProps } from '../../../types';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const FileUploaderDraggingNotAvailable = () => {
  const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();

  const attachmentComponent = ({ id, ...props }: SpiritFileUploaderAttachmentProps) => (
    <FileUploaderAttachment key={id} id={id} {...props} />
  );

  useEffect(() => {
    const container = document.getElementById('file-uploader-dragging-not-available');
    if (!container) {
      return undefined;
    }

    const observer = new MutationObserver(() => {
      const element = container.querySelector('.has-drag-and-drop');
      element?.classList.remove('has-drag-and-drop');
    });

    observer.observe(container, { subtree: true, attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE
  return (
    <FileUploader
      addToQueue={addToQueue}
      clearQueue={clearQueue}
      fileQueue={fileQueue}
      findInQueue={findInQueue}
      id="file-uploader-dragging-not-available"
      onDismiss={onDismiss}
      updateQueue={updateQueue}
    >
      <FileUploaderInput
        helperText="Max file size is 10 MB"
        id="file-uploader-dragging-not-available-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
        onError={(error) => console.error('My error log', error)}
      />
      <FileUploaderList
        attachmentComponent={attachmentComponent}
        id="file-uploader-dragging-not-available-attachment"
        inputName="attachments"
        label="Attachments"
      />
    </FileUploader>
  );
};

export default FileUploaderDraggingNotAvailable;
