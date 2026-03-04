import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import SegmentedControlItem from '../SegmentedControlItem';

const meta: Meta<typeof SegmentedControlItem> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControlItem,
  argTypes: {
    children: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
    },
  },
  args: {
    children: 'Item label',
    isDisabled: false,
    value: 'value-1',
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControlItem>;

export const SegmentedControlItemPlayground: Story = {
  name: 'SegmentedControlItem',
  render: (args) => <SegmentedControlItem {...args} />,
};
