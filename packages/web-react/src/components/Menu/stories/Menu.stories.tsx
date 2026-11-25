import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { type SpiritMenuProps } from '../../../types';
import { Button } from '../../Button';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import ReadMe from '../README.md?raw';
import { Menu } from '..';

const MenuWithDropdown = (args: SpiritMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown id="menu-story" isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
      <DropdownTrigger elementType={Button}>Actions</DropdownTrigger>
      <DropdownPopover>
        <Menu {...args}>
          <Item startSlot={<Icon name="edit" />}>Edit</Item>
          <Item startSlot={<Icon name="download" />}>Download</Item>
          <Item startSlot={<Icon name="link" />} isDisabled>
            Copy link
          </Item>
          <Item startSlot={<Icon name="visibility-off" />}>Hide</Item>
        </Menu>
      </DropdownPopover>
    </Dropdown>
  );
};

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    'aria-label': 'Actions',
  },
  render: (args) => <MenuWithDropdown {...args} />,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Playground: Story = {
  name: 'Menu',
};
