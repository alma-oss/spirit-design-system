import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  UNSTABLE_AttachmentActionButton,
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
} from '..';

const meta: Meta<typeof UNSTABLE_AttachmentActionButton> = {
  title: 'Experimental/UNSTABLE_FileUpload',
  component: UNSTABLE_AttachmentActionButton,
  argTypes: {
    name: {
      control: 'text',
      table: {
        defaultValue: { summary: 'edit' },
      },
    },
    children: {
      control: 'text',
    },
  },
  args: {
    name: 'edit',
    children: 'Edit',
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_AttachmentActionButton>;

export const AttachmentActionButtonPlayground: Story = {
  name: 'UNSTABLE_AttachmentActionButton',
  render: (args) => (
    <UNSTABLE_FileUpload id="attachment-action-button-demo">
      <UNSTABLE_FileUploadAttachments id="attachment-action-button-demo-list" label="Attachments">
        <UNSTABLE_FileUploadAttachment
          id="attachment-action-button-demo-item"
          label="Attachment item"
          onDismiss={() => {}}
          onChange={() => {}}
          editText={typeof args.children === 'string' ? args.children : 'Edit'}
        />
      </UNSTABLE_FileUploadAttachments>
    </UNSTABLE_FileUpload>
  ),
};
