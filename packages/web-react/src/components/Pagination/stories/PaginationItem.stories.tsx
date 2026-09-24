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
        <PaginationLink
          href="#"
          pageNumber={11}
          strings={{
            ariaLabel: { page: 'Go to Page 11' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={12}
          strings={{
            ariaLabel: { page: 'Go to Page 12' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={13}
          strings={{
            ariaLabel: { page: 'Current Page, Page 13' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={14}
          strings={{
            ariaLabel: { page: 'Go to Page 14' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={15}
          strings={{
            ariaLabel: { page: 'Go to Page 15' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>
  ),
};
