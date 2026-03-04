import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEMO_ATTACHMENT_BASE64_IMAGE_40X52 } from '../demo/constants';
import { type FileUploader, FileUploaderAttachment, base64ToByteArray } from '..';

const byteArray = base64ToByteArray(DEMO_ATTACHMENT_BASE64_IMAGE_40X52);

const meta: Meta<typeof FileUploaderAttachment> = {
  title: 'Components/FileUploader',
  component: FileUploaderAttachment,
  argTypes: {
    editText: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Edit' },
      },
    },
    file: {
      control: 'file',
    },
    hasImagePreview: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
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
    name: {
      control: 'text',
    },
    onDismiss: {
      control: 'text',
    },
    onEdit: {
      control: 'text',
    },
    onError: {
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
    file: new File([byteArray], 'test1.png', { type: 'image/png', lastModified: 123456789 }),
    hasImagePreview: false,
    id: 'file-uploader-attachment-example',
    iconName: 'file',
    label: 'File name',
    name: 'attachments',
    onDismiss: undefined,
    onEdit: undefined,
    onError: undefined,
    removeText: 'Remove',
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const FileUploaderAttachmentPlayground: Story = {
  name: 'FileUploaderAttachment',
};
