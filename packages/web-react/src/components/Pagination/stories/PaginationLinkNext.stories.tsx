import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Pagination, PaginationItem, PaginationLink, PaginationLinkNext, PaginationLinkPrevious } from '..';

const meta: Meta<typeof PaginationLinkNext> = {
  title: 'Components/Pagination',
  component: PaginationLinkNext,
  argTypes: {
    accessibilityLabel: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
  },
  args: {
    accessibilityLabel: 'Next',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof PaginationLinkNext>;

export const PaginationLinkNextPlayground: Story = {
  name: 'PaginationLinkNext',
  render: (args) => (
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 11" pageNumber={11} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 12" pageNumber={12} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 13" pageNumber={13} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 14" pageNumber={14} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 15" pageNumber={15} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext {...args} />
      </PaginationItem>
    </Pagination>
  ),
};
