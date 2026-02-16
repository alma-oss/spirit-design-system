import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ReadMe from '../README.md?raw';
import { UNSTABLE_Attachment } from '..';

const meta: Meta<typeof UNSTABLE_Attachment> = {
  title: 'Experimental/UNSTABLE_Attachment',
  component: UNSTABLE_Attachment,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
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
    elementType: {
      control: 'text',
      description: 'The HTML element to render (default: li)',
      table: {
        defaultValue: { summary: 'li' },
      },
    },
    isFluid: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
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
    isFluid: false,
    label: 'File name',
    onDismiss: undefined,
    onChange: undefined,
    removeText: 'Remove',
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_Attachment>;

export const AttachmentPlayground: Story = {
  name: 'UNSTABLE_Attachment',
};
