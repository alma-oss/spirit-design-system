import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ObjectFit } from '../../../constants';
import {
  UNSTABLE_AttachmentImagePreview,
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
} from '..';

const meta: Meta<typeof UNSTABLE_AttachmentImagePreview> = {
  title: 'Experimental/UNSTABLE_FileUpload',
  component: UNSTABLE_AttachmentImagePreview,
  argTypes: {
    imagePreview: {
      control: 'text',
      description: 'URL of the image to display',
    },
    label: {
      control: 'text',
    },
    imageObjectFit: {
      control: 'select',
      options: [undefined, ObjectFit.CONTAIN, ObjectFit.COVER],
      table: {
        defaultValue: { summary: 'cover' },
      },
    },
  },
  args: {
    imagePreview: 'https://picsum.photos/id/823/132/162',
    label: 'Preview image',
    imageObjectFit: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_AttachmentImagePreview>;

export const AttachmentImagePreviewPlayground: Story = {
  name: 'UNSTABLE_AttachmentImagePreview',
  render: (args) => (
    <UNSTABLE_FileUpload id="attachment-image-preview-demo">
      <UNSTABLE_FileUploadAttachments id="attachment-image-preview-demo-list" label="Attachments">
        <UNSTABLE_FileUploadAttachment
          id="attachment-image-preview-demo-item"
          label={args.label}
          onDismiss={() => {}}
          thumbnail={<UNSTABLE_AttachmentImagePreview {...args} />}
        />
      </UNSTABLE_FileUploadAttachments>
    </UNSTABLE_FileUpload>
  ),
};
