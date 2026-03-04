import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Pagination, PaginationItem, PaginationLink, PaginationLinkNext, PaginationLinkPrevious } from '..';

const meta: Meta<typeof PaginationItem> = {
  title: 'Components/Pagination',
  component: PaginationItem,
  argTypes: {
    children: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationItem>;

export const PaginationItemPlayground: Story = {
  name: 'PaginationItem',
  render: (args) => (
    <Pagination>
      <PaginationItem {...args}>
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
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>
  ),
};
