import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SizesExtended } from '../../../constants';
import { SkeletonText } from '../index';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof SkeletonText> = {
  title: 'Components/Skeleton',
  component: SkeletonText,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [...Object.values(SizesExtended)],
      table: {
        defaultValue: { summary: SizesExtended.MEDIUM },
      },
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
  },
  args: {
    size: SizesExtended.MEDIUM,
    lines: 3,
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonText>;

export const SkeletonTextPlayground: Story = {
  name: 'SkeletonText',
};
