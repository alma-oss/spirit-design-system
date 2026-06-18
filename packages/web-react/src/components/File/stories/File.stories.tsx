import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import { ObjectFit, ValidationStates } from '../../../constants';
import { Stack } from '../../Stack';
import ReadMe from '../README.md?raw';
import type { FileProps } from '../types';
import { File, FileImagePreview } from '..';

const IMAGE_PREVIEW_URL = 'https://picsum.photos/seed/storybook-unstable-file/48/48';

type FileStoryArgs = FileProps & {
  /** Renders edit button with a Storybook action (not a real `File` prop). */
  showEditButton?: boolean;
  /** Injects `FileImagePreview` into `previewSlot` (demo toggle). */
  showImagePreview?: boolean;
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
};

const meta = {
  title: 'Components/File',
  component: File,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: {
      exclude: ['validationStateIcon', 'previewSlot', 'onChange'],
    },
  },
  argTypes: {
    editText: {
      control: 'text',
      table: { defaultValue: { summary: 'Edit' } },
    },
    hasValidationIcon: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    helperText: {
      control: 'text',
    },
    iconName: {
      control: 'text',
      table: { defaultValue: { summary: 'file' } },
    },
    id: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
    },
    removeText: {
      control: 'text',
      table: { defaultValue: { summary: 'Remove' } },
    },
    validationState: {
      control: 'select',
      options: [...Object.values(ValidationStates), undefined],
      table: { defaultValue: { summary: undefined } },
    },
    validationText: {
      control: 'text',
      description: 'Shown when `validationState` is set.',
    },
    showEditButton: {
      control: 'boolean',
      description: 'Adds `onChange` so the edit button is rendered (Storybook action).',
      table: { category: 'Demo', defaultValue: { summary: 'false' } },
    },
    showImagePreview: {
      control: 'boolean',
      description: 'Fills `previewSlot` with `FileImagePreview` using a sample image URL.',
      table: { category: 'Demo', defaultValue: { summary: 'false' } },
    },
    imageObjectFit: {
      control: 'select',
      options: [ObjectFit.CONTAIN, ObjectFit.COVER],
      table: { category: 'Demo', defaultValue: { summary: ObjectFit.COVER } },
    },
  },
  args: {
    editText: 'Edit',
    hasValidationIcon: false,
    helperText: '2.5 MB',
    iconName: 'file',
    id: 'unstable-file',
    isDisabled: false,
    label: 'Document.pdf',
    onDismiss: fn(),
    removeText: 'Remove',
    validationState: undefined,
    validationText: 'Validation message',
    showEditButton: false,
    showImagePreview: false,
    imageObjectFit: ObjectFit.COVER,
  },
  render: (args: FileStoryArgs) => {
    const { showEditButton, showImagePreview, imageObjectFit, ...fileArgs } = args;

    return (
      <Stack aria-label="Uploaded files" elementType="ul" hasSpacing>
        <File
          {...fileArgs}
          {...(showEditButton ? { onChange: fn() } : {})}
          {...(showImagePreview && {
            previewSlot: (
              <FileImagePreview
                imageObjectFit={imageObjectFit}
                imagePreview={IMAGE_PREVIEW_URL}
                label={fileArgs.label}
              />
            ),
          })}
        />
      </Stack>
    );
  },
} satisfies Meta<FileStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'File',
};
