import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { BorderRadii } from '../../../constants';
import SkeletonShape from '../SkeletonShape';
import { parseSkeletonDimension } from './helper';

const meta: Meta<typeof SkeletonShape> = {
  title: 'Components/Skeleton',
  component: SkeletonShape,
  argTypes: {
    borderRadius: {
      control: 'select',
      options: [...Object.values(BorderRadii)],
      table: {
        defaultValue: { summary: BorderRadii['300'] },
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
      description: 'Pixel number or a percentage, for example `100` or `50%`.',
    },
    height: {
      control: 'text',
      description: 'Pixel number or a percentage, for example `100` or `50%`.',
    },
  },
  args: {
    borderRadius: BorderRadii['300'],
    width: 100,
    height: 100,
    elementType: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonShape>;

export const SkeletonShapePlayground: Story = {
  name: 'SkeletonShape',
  render: (args) => (
    <SkeletonShape
      {...args}
      width={parseSkeletonDimension(args.width) ?? args.width}
      height={parseSkeletonDimension(args.height) ?? args.height}
    />
  ),
};
