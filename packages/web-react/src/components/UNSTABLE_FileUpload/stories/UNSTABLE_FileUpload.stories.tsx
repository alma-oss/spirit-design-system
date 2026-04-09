import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ValidationStates } from '../../../constants';
import { Stack } from '../../Stack';
import { UNSTABLE_Attachment, UNSTABLE_AttachmentImagePreview } from '../../UNSTABLE_Attachment';
import { useFileUploaderDemo } from '../demo/useFileUploaderDemo';
import ReadMe from '../README.md?raw';
import { type UnstableFileUploadProps } from '../types';
import { UNSTABLE_FileUpload } from '..';

const meta: Meta<typeof UNSTABLE_FileUpload> = {
  title: 'Experimental/UNSTABLE_FileUpload',
  component: UNSTABLE_FileUpload,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['hasValidationStateIcon'] },
  },
  argTypes: {
    accept: {
      control: 'text',
    },
    children: {
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
    id: 'file-uploader',
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
type Story = StoryObj<typeof UNSTABLE_FileUpload>;

const FileUploaderWithHooks = (args: UnstableFileUploadProps) => {
  const { isMultiple, name, ...restArgs } = args;
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(isMultiple ?? false);

  return (
    <Stack hasSpacing>
      <UNSTABLE_FileUpload {...restArgs} name={name ?? 'attachments'} onFilesSelected={onFilesSelected} />
      <Stack aria-label="Attachments" elementType="ul" hasSpacing>
        {items.map((item) => (
          <UNSTABLE_Attachment
            key={item.id}
            id={item.id}
            label={item.label}
            onDismiss={() => onDismiss(item.id)}
            {...(isMultiple &&
              item.previewUrl && {
                previewSlot: (
                  <UNSTABLE_AttachmentImagePreview imagePreview={item.previewUrl} label={item.label} meta={item.meta} />
                ),
              })}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export const Playground: Story = {
  name: 'UNSTABLE_FileUpload',
  render: (args) => <FileUploaderWithHooks {...args} />,
};
