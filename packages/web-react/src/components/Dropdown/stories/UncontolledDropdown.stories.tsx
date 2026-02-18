import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Icon, Text } from '../..';
import { Placements } from '../../../constants';
import { DropdownFullWidthModes } from '../../../types';
import ReadMe from '../README.md?raw';
import { DropdownPopover, DropdownTrigger, UncontrolledDropdown } from '..';

const meta: Meta<typeof UncontrolledDropdown> = {
  title: 'Components/Dropdown',
  component: UncontrolledDropdown,
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
    enableAutoClose: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    fullWidthMode: {
      control: 'select',
      options: [...Object.values(DropdownFullWidthModes), undefined],
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    id: {
      control: 'text',
    },
    placement: {
      control: 'select',
      options: Object.values(Placements),
      table: {
        defaultValue: { summary: Placements.BOTTOM_START },
      },
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
    id: 'uncontrolled-dropdown-example',
  },
};

export default meta;
type Story = StoryObj<typeof UncontrolledDropdown>;

export const UncontrolledDropdownPlayground: Story = {
  name: 'UncontrolledDropdown',
  render: (args) => (
    <UncontrolledDropdown {...args}>
      <DropdownTrigger elementType={Button}>Button as anchor</DropdownTrigger>
      <DropdownPopover>{args.children}</DropdownPopover>
    </UncontrolledDropdown>
  ),
};
