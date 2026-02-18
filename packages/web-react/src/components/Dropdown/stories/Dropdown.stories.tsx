import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Icon, Text } from '../..';
import { AlignmentXExtended, AlignmentYExtended, Placements } from '../../../constants';
import { DropdownFullWidthModes, type SpiritDropdownProps } from '../../../types';
import ReadMe from '../README.md?raw';
import { Dropdown, DropdownPopover, DropdownTrigger } from '..';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    layout: 'centered',
  },
  argTypes: {
    alignmentX: {
      control: 'select',
      options: [undefined, ...Object.values(AlignmentXExtended)],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    alignmentY: {
      control: 'select',
      options: [undefined, ...Object.values(AlignmentYExtended)],
      table: {
        defaultValue: { summary: undefined },
      },
    },
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
    alignmentX: undefined,
    alignmentY: undefined,
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
    id: 'dropdown-example',
    placement: Placements.BOTTOM_START,
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const DropdownWithHooks = (args: SpiritDropdownProps) => {
  const { children, isOpen } = args;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const onDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <Dropdown {...args} isOpen={isOpen || isDropdownOpen} onToggle={onDropdownToggle}>
      <DropdownTrigger elementType={Button}>Button as anchor</DropdownTrigger>
      <DropdownPopover>{children}</DropdownPopover>
    </Dropdown>
  );
};

export const DropdownPlayground: Story = {
  name: 'Dropdown',
  render: (args) => <DropdownWithHooks {...args} />,
};
