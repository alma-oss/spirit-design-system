import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { EmotionColors } from '../../../constants';
import ReadMe from '../README.md?raw';
import { Pill, PillColorsExtended } from '..';

const meta: Meta<typeof Pill> = {
  title: 'Components/Pill',
  component: Pill,
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
      options: [...Object.values(PillColorsExtended), ...Object.values(EmotionColors)],
      table: {
        defaultValue: { summary: 'selected' },
      },
    },
    isSubtle: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'span' },
      },
    },
  },
  args: {
    children: '3',
    color: PillColorsExtended.SELECTED,
    elementType: 'span',
    isSubtle: false,
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Playground: Story = {
  name: 'Pill',
};
