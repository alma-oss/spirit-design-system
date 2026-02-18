import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { fn } from 'storybook/test';
import { type SpiritFileUploaderAttachmentProps, type SpiritFileUploaderProps } from '../../../types';
import ReadMe from '../README.md?raw';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const meta: Meta<typeof FileUploader> = {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['hasValidationStateIcon'] },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    errorMessages: {
      control: 'object',
    },
    fileQueue: {
      control: 'object',
    },
    id: {
      control: 'text',
    },
    isFluid: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    id: 'file-uploader',
    isFluid: false,
    findInQueue: fn(),
    onDismiss: fn(),
    updateQueue: fn(),
    clearQueue: fn(),
    addToQueue: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

const FileUploaderWithHooks = (args: SpiritFileUploaderProps) => {
  const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();

  const attachmentComponent = ({ id, ...props }: SpiritFileUploaderAttachmentProps) => (
    <FileUploaderAttachment key={id} id={id} {...props} />
  );

  return (
    <FileUploader
      {...args}
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
        /* eslint-disable-next-line no-console */
        onError={(error) => console.error('My error log', error)}
      />
      <FileUploaderList
        id="file-uploader-example-list"
        label="Attachments"
        inputName="attachments"
        attachmentComponent={attachmentComponent}
      />
    </FileUploader>
  );
};

export const Playground: Story = {
  name: 'FileUploader',
  render: (args) => <FileUploaderWithHooks {...args} />,
};
