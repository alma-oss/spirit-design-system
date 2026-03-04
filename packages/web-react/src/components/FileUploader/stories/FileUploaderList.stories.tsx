import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { type SpiritFileUploaderAttachmentProps, type SpiritFileUploaderListProps } from '../../../types';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const meta: Meta<typeof FileUploaderList> = {
  title: 'Components/FileUploader',
  component: FileUploaderList,
  argTypes: {
    hasImagePreview: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    id: {
      control: 'text',
    },
    inputName: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    hasImagePreview: false,
    id: 'file-uploader-example-list',
    inputName: 'attachments',
    label: 'Attachments',
  },
};

export default meta;
type Story = StoryObj<typeof FileUploaderList>;

const FileUploaderWithHooks = (args: SpiritFileUploaderListProps) => {
  const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();

  const attachmentComponent = ({ id, ...props }: SpiritFileUploaderAttachmentProps) => (
    <FileUploaderAttachment key={id} id={id} {...props} />
  );

  return (
    <FileUploader
      id="file-uploader-example"
      onDismiss={onDismiss}
      fileQueue={fileQueue}
      addToQueue={addToQueue}
      clearQueue={clearQueue}
      findInQueue={findInQueue}
      updateQueue={updateQueue}
    >
      <FileUploaderInput
        id="file-uploader-example-input"
        name="attachments"
        label="Label"
        linkText="Upload your file(s)"
        labelText="or drag and drop here"
        helperText="Max file size is 10 MB"
        validationText="Validation message"
        maxUploadedFiles={2}
        /* eslint-disable-next-line no-console */
        onError={(error) => console.error('My error log', error)}
        isMultiple
      />
      <FileUploaderList {...args} attachmentComponent={attachmentComponent} />
    </FileUploader>
  );
};

export const FileUploaderListPlayground: Story = {
  name: 'FileUploaderList',
  render: (args) => <FileUploaderWithHooks {...args} />,
};
