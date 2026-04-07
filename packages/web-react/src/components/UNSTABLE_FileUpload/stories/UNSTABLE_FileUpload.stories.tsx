import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ValidationStates } from '../../../constants';
import { Stack } from '../../Stack';
import { UNSTABLE_File, UNSTABLE_FileImagePreview } from '../../UNSTABLE_File';
import { useFileUploaderDemo } from '../demo/useFileUploaderDemo';
import ReadMe from '../README.md?raw';
import { type UnstableFileUploadProps } from '../types';
import { UNSTABLE_FileUpload } from '..';

const meta: Meta<typeof UNSTABLE_FileUpload> = {
  title: 'Experimental/UNSTABLE_FileUpload',
  component: UNSTABLE_FileUpload,
  decorators: [
    (Story) => (
      <div className="spirit-feature-enable-v5-control-button-expanded-size-scale">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: {
      exclude: ['hasValidationStateIcon', 'onFilesSelected', 'dropZoneRef', 'inputRef', 'children'],
    },
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'Comma-separated file types for the native file picker (`input accept`).',
      table: { defaultValue: { summary: '—' } },
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
    isDragAndDropSupported: {
      control: 'select',
      description:
        'Override drag-and-drop support (dashed border and DnD handlers). Leave unset to use environment detection.',
      options: [undefined, true, false],
      table: { defaultValue: { summary: 'undefined (auto)' } },
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isCompact: {
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
    buttonText: {
      control: 'text',
      description: 'Decorative button label (`aria-hidden`; use `linkText` / label for the primary accessible name).',
      table: { defaultValue: { summary: 'Browse' } },
    },
    name: {
      control: 'text',
      description: 'When set, renders the file input and drop zone; also sets the input `name`.',
    },
    rootId: {
      control: 'text',
      description: 'Optional `id` on the root `.UNSTABLE_FileUpload` wrapper (doc anchors / page structure).',
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
    hasValidationIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    accept: '',
    buttonText: 'Browse',
    hasValidationIcon: false,
    helperText: 'Max file size is 10 MB',
    id: 'file-uploader',
    isDisabled: false,
    isCompact: false,
    isLabelHidden: false,
    isMultiple: false,
    isRequired: false,
    label: 'Label',
    labelText: 'or drag and drop here',
    linkText: 'Upload your file(s)',
    name: 'attachments',
    rootId: '',
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
          <UNSTABLE_File
            key={item.id}
            id={item.id}
            label={item.label}
            helperText="2.5 MB"
            onDismiss={() => onDismiss(item.id)}
            {...(isMultiple &&
              item.previewUrl && {
                previewSlot: (
                  <UNSTABLE_FileImagePreview imagePreview={item.previewUrl} label={item.label} meta={item.meta} />
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
