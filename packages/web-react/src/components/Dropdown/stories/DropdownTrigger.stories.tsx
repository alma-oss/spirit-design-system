import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../Button';
import ReadMe from '../README.md?raw';
import { DropdownTrigger } from '..';

const meta: Meta<typeof DropdownTrigger> = {
  title: 'Components/Dropdown',
  component: DropdownTrigger,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'object',
      description: 'The content to display in the component.',
    },
    elementType: {
      control: 'object',
      table: {
        defaultValue: { summary: 'Button' },
      },
    },
  },
  args: {
    children: 'Hello World',
    elementType: Button,
  },
};

export default meta;
type Story = StoryObj<typeof DropdownTrigger>;

export const DropdownTriggerPlayground: Story = {
  name: 'DropdownTrigger',
  render: (args) => <DropdownTrigger elementType={args.elementType}>{args.children}</DropdownTrigger>,
};
