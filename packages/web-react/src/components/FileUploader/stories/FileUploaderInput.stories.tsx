import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ValidationStates } from '../../../constants';
import { type SpiritFileUploaderAttachmentProps, type SpiritFileUploaderInputProps } from '../../../types';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const meta: Meta<typeof FileUploaderInput> = {
  title: 'Components/FileUploader',
  component: FileUploaderInput,
  argTypes: {
    accept: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    iconName: {
      control: 'text',
      table: {
        defaultValue: { summary: 'upload' },
      },
    },
    id: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isLabelHidden: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isMultiple: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isRequired: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
    },
    labelText: {
      control: 'text',
    },
    linkText: {
      control: 'text',
    },
    maxFileSize: {
      control: 'number',
      table: {
        defaultValue: { summary: '1000000' },
      },
    },
    maxUploadedFiles: {
      control: 'number',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    name: {
      control: 'text',
    },
    onError: {
      control: 'text',
    },
    queueLimitBehavior: {
      control: 'select',
      options: ['hide', 'disable', 'none'],
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    validationState: {
      control: 'select',
      options: [...Object.values(ValidationStates), undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    validationText: {
      control: 'object',
      description:
        'The validation text. Only visible if validationState is set. Use a string `"foo"` for single validation text or an array for multiple validation texts `["foo", "bar"]`.',
    },
    hasValidationIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    hasValidationIcon: false,
    helperText: 'Max file size is 10 MB',
    id: 'file-uploader-example-input',
    isDisabled: false,
    isLabelHidden: false,
    isMultiple: false,
    isRequired: false,
    label: 'Label',
    labelText: 'or drag and drop here',
    linkText: 'Upload your file(s)',
    maxUploadedFiles: 1,
    name: 'attachments',
    onError: undefined,
    validationState: undefined,
    validationText: 'Validation message',
  },
};

export default meta;
type Story = StoryObj<typeof FileUploaderInput>;

const FileUploaderWithHooks = (args: SpiritFileUploaderInputProps) => {
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
      <FileUploaderInput {...args} />
      <FileUploaderList
        id="file-uploader-example-list"
        label="Attachments"
        inputName="attachments"
        attachmentComponent={attachmentComponent}
      />
    </FileUploader>
  );
};

export const FileUploaderInputPlayground: Story = {
  name: 'FileUploaderInput',
  render: (args) => (
    <FileUploaderWithHooks
      {...args}
      ref={undefined}
      name="attachments"
      /* eslint-disable-next-line no-console */
      onError={(error) => console.error('My error log', error)}
    />
  ),
};
