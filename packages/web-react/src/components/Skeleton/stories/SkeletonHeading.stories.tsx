import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SizesExtended } from '../../../constants';
import SkeletonHeading from '../SkeletonHeading';
import { parseSkeletonDimension } from './helper';

const meta: Meta<typeof SkeletonHeading> = {
  title: 'Components/Skeleton',
  component: SkeletonHeading,
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
      description: 'Pixel number or a percentage, for example `240` or `50%`.',
      table: {
        defaultValue: { summary: '100%' },
      },
    },
  },
  args: {
    size: SizesExtended.MEDIUM,
    lines: 3,
    elementType: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonHeading>;

export const SkeletonHeadingPlayground: Story = {
  name: 'SkeletonHeading',
  render: (args) => <SkeletonHeading {...args} width={parseSkeletonDimension(args.width)} />,
};
