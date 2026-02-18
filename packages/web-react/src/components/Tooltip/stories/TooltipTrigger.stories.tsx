import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../Button';
import ReadMe from '../README.md?raw';
import { TooltipTrigger } from '..';

const meta: Meta<typeof TooltipTrigger> = {
  title: 'Components/Tooltip',
  component: TooltipTrigger,
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
type Story = StoryObj<typeof TooltipTrigger>;

export const TooltipTriggerPlayground: Story = {
  name: 'TooltipTrigger',
  render: (args) => <TooltipTrigger elementType={args.elementType}>{args.children}</TooltipTrigger>,
};
