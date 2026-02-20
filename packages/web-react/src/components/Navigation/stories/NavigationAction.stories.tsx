import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ShapeVariants } from '../../../constants';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof NavigationAction> = {
  title: 'Components/Navigation',
  component: NavigationAction,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isSelected: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: [...Object.values(ShapeVariants)],
      table: {
        defaultValue: { summary: ShapeVariants.BOX },
      },
    },
  },
  args: {
    children: 'Link',
    isDisabled: false,
    isSelected: false,
    variant: ShapeVariants.BOX,
  },
};

export default meta;
type Story = StoryObj<typeof NavigationAction>;

export const NavigationActionPlayground: Story = {
  name: 'NavigationAction',
  render: (args) => (
    <Navigation>
      <NavigationItem>
        <NavigationAction {...args} />
      </NavigationItem>
    </Navigation>
  ),
};
