import type { Meta, StoryObj } from '@storybook/react-vite';
import { BorderRadii } from '../../../constants';
import SkeletonShape from '../SkeletonShape';

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
};
