import type { Meta, StoryObj } from '@storybook/react-vite';
import { SizesExtended } from '../../../constants';
import SkeletonHeading from '../SkeletonHeading';

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
};
