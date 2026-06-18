import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ValidationStates } from '../../../constants';
import { File, FileImagePreview } from '../../File';
import { Stack } from '../../Stack';
import { useFileUploaderDemo } from '../demo/useFileUploaderDemo';
import ReadMe from '../README.md?raw';
import { type FileUploadProps } from '../types';
import { FileUpload } from '..';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: {
      exclude: ['validationStateIcon', 'onFilesSelected', 'dropZoneRef', 'inputRef', 'children'],
    },
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'Comma-separated file types for the native file picker (`input accept`).',
      table: { defaultValue: { summary: '—' } },
    },
    buttonText: {
      control: 'text',
      description:
        'Decorative button label (`aria-hidden`; use `inputUploadText` / `label` for the primary accessible name).',
      table: { defaultValue: { summary: 'Browse' } },
    },
    hasValidationIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
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
      description: 'File input id (label / `aria-describedby` linkage).',
    },
    inputDragAndDropText: {
      control: 'text',
      description: 'Drag-and-drop suffix in the drop zone.',
    },
    inputUploadText: {
      control: 'text',
      description: 'Primary label in the drop zone.',
    },
    isCompact: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isDragAndDropSupported: {
      control: 'select',
      description:
        'Override drag-and-drop support (dashed border and DnD handlers). Leave unset to use environment detection.',
      options: [undefined, true, false],
      table: { defaultValue: { summary: 'undefined (auto)' } },
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
    isUploadDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
    },
    name: {
      control: 'text',
      description: 'When set, renders the file input and drop zone; also sets the input `name`.',
    },
    rootId: {
      control: 'text',
      description: 'Optional `id` on the root `.FileUpload` wrapper (doc anchors / page structure).',
      table: { defaultValue: { summary: '—' } },
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
  },
  args: {
    accept: '',
    buttonText: 'Browse',
    hasValidationIcon: false,
    helperText: 'Max file size is 10 MB',
    id: 'file-uploader',
    inputDragAndDropText: 'or drag and drop here',
    inputUploadText: 'Upload your file(s)',
    isCompact: false,
    isDisabled: false,
    isLabelHidden: false,
    isMultiple: false,
    isRequired: false,
    isUploadDisabled: false,
    label: 'Label',
    name: 'attachments',
    rootId: '',
    validationState: undefined,
    validationText: 'Validation message',
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

const FileUploaderWithHooks = (args: FileUploadProps) => {
  const { isMultiple, name, ...restArgs } = args;
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(isMultiple ?? false);

  return (
    <Stack hasSpacing>
      <FileUpload {...restArgs} name={name ?? 'attachments'} onFilesSelected={onFilesSelected} />
      <Stack aria-label="Attachments" elementType="ul" hasSpacing>
        {items.map((item) => (
          <File
            key={item.id}
            id={item.id}
            label={item.label}
            helperText="2.5 MB"
            onDismiss={() => onDismiss(item.id)}
            {...(isMultiple &&
              item.previewUrl && {
                previewSlot: <FileImagePreview imagePreview={item.previewUrl} label={item.label} meta={item.meta} />,
              })}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export const Playground: Story = {
  name: 'FileUpload',
  render: (args) => <FileUploaderWithHooks {...args} />,
};
