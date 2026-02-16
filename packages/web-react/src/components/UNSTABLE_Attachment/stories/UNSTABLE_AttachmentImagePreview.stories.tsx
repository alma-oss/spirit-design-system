import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ObjectFit } from '../../../constants';
import { Stack } from '../../Stack';
import ReadMe from '../README.md?raw';
import { UNSTABLE_Attachment, UNSTABLE_AttachmentImagePreview } from '..';

const meta: Meta<typeof UNSTABLE_AttachmentImagePreview> = {
  title: 'Experimental/UNSTABLE_Attachment',
  component: UNSTABLE_AttachmentImagePreview,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
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
    <Stack aria-label="Attachments" elementType="ul" hasSpacing>
      <UNSTABLE_Attachment
        id="attachment-image-preview-demo-item"
        label={args.label}
        onDismiss={() => {}}
        previewSlot={<UNSTABLE_AttachmentImagePreview {...args} />}
      />
    </Stack>
  ),
};
