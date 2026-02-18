import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmotionColors } from '../../../constants';
import ReadMe from '../README.md?raw';
import { Alert } from '..';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    color: {
      control: 'select',

      options: [...Object.values(EmotionColors)],
      table: {
        defaultValue: { summary: EmotionColors.SUCCESS },
      },
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    iconName: {
      control: 'text',
    },
    isCentered: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    children: 'Hey! Pay attention.',
    color: EmotionColors.SUCCESS,
    elementType: 'div',
    isCentered: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  name: 'Alert',
};
