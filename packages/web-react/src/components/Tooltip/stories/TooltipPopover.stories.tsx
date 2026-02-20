import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../..';
import ReadMe from '../README.md?raw';
import { Tooltip, TooltipPopover, TooltipTrigger } from '..';

const meta: Meta<typeof TooltipPopover> = {
  title: 'Components/Tooltip',
  component: TooltipPopover,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'object',
    },
  },
  args: {
    children: <>Tooltip popover</>,
  },
};

export default meta;
type Story = StoryObj<typeof TooltipPopover>;

export const TooltipPopoverPlayground: Story = {
  name: 'TooltipPopover',
  render: (args) => (
    <Tooltip id="tooltip-example" isOpen onToggle={() => {}}>
      <TooltipTrigger elementType={Button}>Button as anchor</TooltipTrigger>
      <TooltipPopover>{args.children}</TooltipPopover>
    </Tooltip>
  ),
};
