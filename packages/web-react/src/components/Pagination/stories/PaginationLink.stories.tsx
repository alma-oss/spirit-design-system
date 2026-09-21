import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Pagination, PaginationItem, PaginationLink, PaginationLinkNext, PaginationLinkPrevious } from '..';

const meta: Meta<typeof PaginationLink> = {
  title: 'Components/Pagination',
  component: PaginationLink,
  argTypes: {
    strings: {
      control: 'object',
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'a' },
      },
    },
    isCurrent: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    pageNumber: {
      control: 'number',
    },
  },
  args: {
    strings: { ariaLabel: { page: 'Go to Page 11' } },
    elementType: 'a',
    pageNumber: 11,
  },
};

export default meta;
type Story = StoryObj<typeof PaginationLink>;

export const PaginationLinkPlayground: Story = {
  name: 'PaginationLink',
  render: (args) => (
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink {...args} />
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
