import React from 'react';
import { type FileUploaderAttachmentBaseProps, type SpiritUncontrolledFileUploaderProps } from '../../../types';
import FileUploaderAttachment from '../FileUploaderAttachment';
import UncontrolledFileUploader from '../UncontrolledFileUploader';

const Story = (args: SpiritUncontrolledFileUploaderProps) => <UncontrolledFileUploader {...args} />;

Story.args = {
  attachmentComponent: (props: FileUploaderAttachmentBaseProps) => <FileUploaderAttachment key={props.id} {...props} />,
  iconName: 'upload',
  id: 'file-uploader-uncontrolled',
  inputId: 'file-uploader-uncontrolled-input',
  inputName: 'attachments',
  inputLabel: 'Label',
  linkText: 'Upload your file(s)',
  labelText: 'or drag and drop here',
  helperText: 'Max file size is 10 MB',
  inputProps: {
    accept: '*',
  },
  listId: 'file-uploader-uncontrolled-list',
  listProps: {
    label: 'Attachments',
  },

  onInputError: (error: string | Error) => console.error('My error log', error),
};

export default Story;
