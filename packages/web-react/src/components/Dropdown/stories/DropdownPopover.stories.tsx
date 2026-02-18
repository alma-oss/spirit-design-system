import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Icon, Text } from '../..';
import ReadMe from '../README.md?raw';
import { Dropdown, DropdownPopover, DropdownTrigger } from '..';

const meta: Meta<typeof DropdownPopover> = {
  title: 'Components/Dropdown',
  component: DropdownPopover,
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
    children: (
      <>
        <a href="#info" className="d-flex mb-400">
          <Icon name="info" />
          <Text marginLeft="space-300">Information</Text>
        </a>
        <a href="#link" className="d-flex mb-400">
          <Icon name="link" />
          <Text marginLeft="space-300">More links</Text>
        </a>
        <a href="#profile" className="d-flex mb-400">
          <Icon name="profile" />
          <Text marginLeft="space-300">Profile</Text>
        </a>
        <a href="#help" className="d-flex">
          <Icon name="help" />
          <Text marginLeft="space-300">Help</Text>
        </a>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof DropdownPopover>;

export const DropdownPopoverPlayground: Story = {
  name: 'DropdownPopover',
  render: (args) => (
    <Dropdown id="dropdown-example" isOpen onToggle={() => {}}>
      <DropdownTrigger elementType={Button}>Button as anchor</DropdownTrigger>
      <DropdownPopover>{args.children}</DropdownPopover>
    </Dropdown>
  ),
};
