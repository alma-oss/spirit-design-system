import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import ReadMe from '../README.md?raw';
import { Label } from '..';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'label' },
      },
    },
    hasPointerCursor: {
      control: 'boolean',
    },
    htmlFor: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
    },
    isLabelHidden: {
      control: 'boolean',
    },
    isRequired: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Label text',
    elementType: 'label',
    hasPointerCursor: false,
    htmlFor: 'example-input',
    isDisabled: false,
    isLabelHidden: false,
    isRequired: false,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {
  name: 'Label',
};
