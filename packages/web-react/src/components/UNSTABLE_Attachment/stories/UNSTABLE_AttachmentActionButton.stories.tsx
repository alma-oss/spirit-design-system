import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stack } from '../../Stack';
import ReadMe from '../README.md?raw';
import { UNSTABLE_Attachment, UNSTABLE_AttachmentActionButton } from '..';

const meta: Meta<typeof UNSTABLE_AttachmentActionButton> = {
  title: 'Experimental/UNSTABLE_Attachment',
  component: UNSTABLE_AttachmentActionButton,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
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
    <Stack aria-label="Attachments" elementType="ul" hasSpacing>
      <UNSTABLE_Attachment
        id="attachment-action-button-demo-item"
        label="Attachment item"
        onDismiss={() => {}}
        onChange={() => {}}
        editText={typeof args.children === 'string' ? args.children : 'Edit'}
      />
    </Stack>
  ),
};
