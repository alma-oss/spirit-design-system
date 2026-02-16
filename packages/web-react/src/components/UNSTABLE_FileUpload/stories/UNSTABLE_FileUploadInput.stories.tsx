import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ValidationStates } from '../../../constants';
import { useFileUploaderDemo } from '../demo/useFileUploaderDemo';
import { type SpiritUnstableFileUploadInputProps } from '../types';
import {
  UNSTABLE_AttachmentImagePreview,
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
  UNSTABLE_FileUploadInput,
} from '..';

const meta: Meta<typeof UNSTABLE_FileUploadInput> = {
  title: 'Experimental/UNSTABLE_FileUpload',
  component: UNSTABLE_FileUploadInput,
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
    name: {
      control: 'text',
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
    name: 'attachments',
    validationState: undefined,
    validationText: 'Validation message',
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_FileUploadInput>;

const FileUploaderWithHooks = (args: SpiritUnstableFileUploadInputProps) => {
  const { isMultiple } = args;
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(isMultiple ?? false);

  return (
    <UNSTABLE_FileUpload id="file-uploader-example">
      <UNSTABLE_FileUploadInput {...args} onFilesSelected={onFilesSelected} />
      <UNSTABLE_FileUploadAttachments id="file-uploader-example-list" label="Attachments">
        {items.map((item) => (
          <UNSTABLE_FileUploadAttachment
            key={item.id}
            id={item.id}
            label={item.label}
            onDismiss={() => onDismiss(item.id)}
            {...(isMultiple &&
              item.previewUrl && {
                thumbnail: (
                  <UNSTABLE_AttachmentImagePreview imagePreview={item.previewUrl} label={item.label} meta={item.meta} />
                ),
              })}
          />
        ))}
      </UNSTABLE_FileUploadAttachments>
    </UNSTABLE_FileUpload>
  );
};

export const FileUploadInputPlayground: Story = {
  name: 'UNSTABLE_FileUploadInput',
  render: (args) => <FileUploaderWithHooks {...args} ref={undefined} name="attachments" />,
};
