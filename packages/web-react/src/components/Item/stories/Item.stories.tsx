import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
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
    alignmentY: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
      },
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
    children: {
      control: false,
    },
    startSlot: {
      control: 'select',
      options: ['None', 'Search icon'],
      mapping: {
        None: undefined,
        'Search icon': <Icon name="search" />,
      },
    },
    endSlot: {
      control: 'select',
      options: ['None', 'Check icon', 'Remove button'],
      mapping: {
        None: undefined,
        'Check icon': <Icon name="check-plain" color="selected" />,
        'Remove button': (
          <ControlButton isSymmetrical size="small" aria-label="Remove item">
            <Icon name="close" />
          </ControlButton>
        ),
      },
    },
  },
  args: {
    children: <Label>Item label</Label>,
    startSlot: 'None',
    endSlot: 'None',
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Playground: Story = {
  name: 'Item',
};
