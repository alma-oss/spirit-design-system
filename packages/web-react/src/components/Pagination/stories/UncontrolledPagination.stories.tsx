import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { UncontrolledPagination } from '..';

const meta: Meta<typeof UncontrolledPagination> = {
  title: 'Components/Pagination',
  component: UncontrolledPagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultPage: {
      control: 'number',
      description: 'Default page for the first render; please reload the page to apply this setting.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    totalPages: {
      control: 'number',
    },
    visiblePages: {
      control: 'number',
      table: {
        defaultValue: { summary: '5' },
      },
    },
  },
  args: {
    defaultPage: 3,
    totalPages: 10,
    visiblePages: 5,
  },
};

export default meta;
type Story = StoryObj<typeof UncontrolledPagination>;

export const UncontrolledPaginationPlayground: Story = {
  name: 'UncontrolledPagination',
  render: (args) => <UncontrolledPagination {...args} />,
};
