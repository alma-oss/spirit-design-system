import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Direction } from '../../../constants';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'object',
    },
    direction: {
      control: 'select',
      options: [...Object.values(Direction)],
      table: {
        defaultValue: { summary: Direction.HORIZONTAL },
      },
    },
  },
  args: {
    children: (
      <>
        <NavigationItem>
          <NavigationAction href="#" aria-current="page" isSelected>
            Home
          </NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <NavigationAction href="#">Not Home</NavigationAction>
        </NavigationItem>
      </>
    ),
    direction: Direction.HORIZONTAL,
  },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Playground: Story = {
  name: 'Navigation',
};
