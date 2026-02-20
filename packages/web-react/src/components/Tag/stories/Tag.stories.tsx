import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmotionColors, SizesExtended } from '../../../constants';
import ReadMe from '../README.md?raw';
import { Tag, TagColorsExtended } from '..';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
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
      options: [...Object.values(TagColorsExtended), ...Object.values(EmotionColors)],
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'span' },
      },
    },
    isSubtle: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: [...Object.values(SizesExtended)],
      table: {
        defaultValue: { summary: SizesExtended.MEDIUM },
      },
    },
  },
  args: {
    children: 'Tag',
    color: TagColorsExtended.NEUTRAL,
    elementType: 'span',
    isSubtle: false,
    size: SizesExtended.MEDIUM,
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  name: 'Tag',
};
