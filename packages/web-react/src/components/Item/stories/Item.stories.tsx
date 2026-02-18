import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ReadMe from '../README.md?raw';
import { Item } from '..';

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    helperText: {
      control: 'text',
    },
    iconName: {
      control: 'text',
    },
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
    label: {
      control: 'text',
    },
  },
  args: {
    elementType: 'button',
    label: 'Item label',
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Playground: Story = {
  name: 'Item',
};
