import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import { Stack, StackItem } from '..';

const meta: Meta<typeof StackItem> = {
  title: 'Components/Stack',
  component: StackItem,
  argTypes: {
    children: {
      control: 'object',
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'ElementType' },
      },
    },
  },
  args: {
    children: <DocsBox size="small">Item</DocsBox>,
    elementType: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof StackItem>;

export const StackItemPlayground: Story = {
  name: 'StackItem',
  render: (args) => (
    <Stack>
      <StackItem {...args} />
    </Stack>
  ),
};
