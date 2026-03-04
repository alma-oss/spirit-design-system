import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Stack } from '../../Stack';
import ReadMe from '../README.md?raw';
import { UNSTABLE_Attachment, UNSTABLE_AttachmentDismissButton } from '..';

const meta: Meta<typeof UNSTABLE_AttachmentDismissButton> = {
  title: 'Experimental/UNSTABLE_Attachment',
  component: UNSTABLE_AttachmentDismissButton,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
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
    <Stack aria-label="Attachments" elementType="ul" hasSpacing>
      <UNSTABLE_Attachment
        id="attachment-dismiss-button-demo-item"
        label="Attachment item"
        onDismiss={() => {}}
        removeText={typeof args.children === 'string' ? args.children : 'Remove'}
      />
    </Stack>
  ),
};
