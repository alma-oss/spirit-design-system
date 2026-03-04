import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaginationButtonLink } from '..';

const meta: Meta<typeof PaginationButtonLink> = {
  title: 'Components/Pagination',
  component: PaginationButtonLink,
  argTypes: {
    accessibilityLabel: {
      control: 'text',
    },
    direction: {
      control: 'select',
      options: ['next', 'previous'],
    },
  },
  args: {
    accessibilityLabel: 'Next',
    direction: 'next',
  },
};

export default meta;
type Story = StoryObj<typeof PaginationButtonLink>;

export const PaginationButtonLinkPlayground: Story = {
  name: 'PaginationButtonLink',
};
