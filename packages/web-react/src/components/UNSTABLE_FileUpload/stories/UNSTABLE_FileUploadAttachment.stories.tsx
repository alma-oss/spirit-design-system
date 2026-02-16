import type { Meta, StoryObj } from '@storybook/react';
import { UNSTABLE_FileUploadAttachment } from '..';

const meta: Meta<typeof UNSTABLE_FileUploadAttachment> = {
  title: 'Experimental/UNSTABLE_FileUpload',
  component: UNSTABLE_FileUploadAttachment,
  argTypes: {
    editText: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Edit' },
      },
    },
    iconName: {
      control: 'text',
      table: {
        defaultValue: { summary: 'file' },
      },
    },
    id: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    onDismiss: {
      control: 'text',
    },
    onChange: {
      control: 'text',
    },
    removeText: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Remove' },
      },
    },
  },
  args: {
    editText: 'Edit',
    id: 'file-uploader-attachment-example',
    iconName: 'file',
    label: 'File name',
    onDismiss: undefined,
    onChange: undefined,
    removeText: 'Remove',
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_FileUploadAttachment>;

export const FileUploadAttachmentPlayground: Story = {
  name: 'UNSTABLE_FileUploadAttachment',
};
