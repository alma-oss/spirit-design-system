import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { AlignmentYExtended } from '../../../constants';
import { Icon } from '../../Icon';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof NavigationItem> = {
  title: 'Components/Navigation',
  component: NavigationItem,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    alignmentY: {
      control: 'select',
      options: [AlignmentYExtended.CENTER, AlignmentYExtended.STRETCH],
      table: {
        defaultValue: { summary: AlignmentYExtended.CENTER },
      },
    },
  },
  args: {
    alignmentY: AlignmentYExtended.CENTER,
    children: <NavigationAction href="/">Item</NavigationAction>,
  },
};

export default meta;
type Story = StoryObj<typeof NavigationItem>;

export const NavigationItemPlayground: Story = {
  name: 'NavigationItem',
  render: (args) => (
    <Navigation>
      <NavigationItem {...args} />
    </Navigation>
  ),
};

export const NavigationItemWithSlots: Story = {
  name: 'NavigationItem with Slots',
  render: () => (
    <Navigation aria-label="Navigation Item with Slots" direction="vertical">
      <NavigationItem>
        <NavigationAction href="/" startSlot={<Icon name="profile" />} endSlot={<Icon name="chevron-right" />}>
          Dashboard
        </NavigationAction>
      </NavigationItem>
    </Navigation>
  ),
};

export const NavigationItemOpenCategory: Story = {
  name: 'NavigationItem Open Category',
  render: () => (
    <Navigation aria-label="Navigation Item Open Category" direction="vertical">
      <NavigationItem>
        <NavigationAction
          elementType="button"
          aria-expanded="true"
          startSlot={<Icon name="folder-dualtone" />}
          endSlot={<Icon name="chevron-up" />}
        >
          Menu
        </NavigationAction>
      </NavigationItem>
    </Navigation>
  ),
};
