import figma from '@figma/code-connect';
import React from 'react';
import type { SpiritFileUploaderAttachmentProps } from '../../../types';
import FileUploader from '../FileUploader';
import FileUploaderAttachment from '../FileUploaderAttachment';
import FileUploaderInput from '../FileUploaderInput';
import FileUploaderList from '../FileUploaderList';
import { useFileQueue } from '../useFileQueue';

/* eslint-disable react/no-unstable-nested-components -- this is a Figma example */
const FileUploaderExample = () => {
  const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();

  return (
    <FileUploader
      id="file-uploader-example"
      findInQueue={findInQueue}
      updateQueue={updateQueue}
      onDismiss={onDismiss}
      fileQueue={fileQueue}
      addToQueue={addToQueue}
      clearQueue={clearQueue}
    >
      <FileUploaderInput
        id="file-uploader-example-input"
        name="attachments"
        label="Label"
        linkText="Upload your file"
        labelText="or drag and drop here"
        helperText="Max file size is 10 MB"
      />
      <FileUploaderList
        id="file-uploader-example-list"
        label="Attachments"
        inputName="attachments"
        attachmentComponent={(props: SpiritFileUploaderAttachmentProps) => (
          <FileUploaderAttachment key={props.id} {...props} />
        )}
      />
    </FileUploader>
  );
};

figma.connect(FileUploader, '<FIGMA_FILE_ID>?node-id=11847%3A9984', {
  props: {},
  example: FileUploaderExample,
});
