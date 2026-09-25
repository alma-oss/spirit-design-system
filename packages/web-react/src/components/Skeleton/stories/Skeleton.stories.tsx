import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SizesExtended } from '../../../constants';
import { SkeletonText } from '../index';
import ReadMe from '../README.md?raw';
import { parseSkeletonDimension } from './helper';

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
    width: {
      control: 'text',
      description: 'Pixel number or a percentage, for example `240` or `60%`.',
      table: {
        defaultValue: { summary: '100%' },
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
  render: (args) => <SkeletonText {...args} width={parseSkeletonDimension(args.width)} />,
};
