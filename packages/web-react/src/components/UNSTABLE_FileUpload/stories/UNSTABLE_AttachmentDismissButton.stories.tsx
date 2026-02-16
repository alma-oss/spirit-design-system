import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  UNSTABLE_AttachmentDismissButton,
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
} from '..';

const meta: Meta<typeof UNSTABLE_AttachmentDismissButton> = {
  title: 'Experimental/UNSTABLE_FileUpload',
  component: UNSTABLE_AttachmentDismissButton,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Remove',
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_AttachmentDismissButton>;

export const AttachmentDismissButtonPlayground: Story = {
  name: 'UNSTABLE_AttachmentDismissButton',
  render: (args) => (
    <UNSTABLE_FileUpload id="attachment-dismiss-button-demo">
      <UNSTABLE_FileUploadAttachments id="attachment-dismiss-button-demo-list" label="Attachments">
        <UNSTABLE_FileUploadAttachment
          id="attachment-dismiss-button-demo-item"
          label="Attachment item"
          onDismiss={() => {}}
          removeText={typeof args.children === 'string' ? args.children : 'Remove'}
        />
      </UNSTABLE_FileUploadAttachments>
    </UNSTABLE_FileUpload>
  ),
};
