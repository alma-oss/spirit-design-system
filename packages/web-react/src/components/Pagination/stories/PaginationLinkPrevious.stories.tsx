import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Pagination, PaginationItem, PaginationLink, PaginationLinkNext, PaginationLinkPrevious } from '..';

const meta: Meta<typeof PaginationLinkPrevious> = {
  title: 'Components/Pagination',
  component: PaginationLinkPrevious,
  argTypes: {
    strings: {
      control: 'object',
    },
    href: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    strings: { ariaLabel: { previous: 'Previous' } },
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof PaginationLinkPrevious>;

export const PaginationLinkPreviousPlayground: Story = {
  name: 'PaginationLinkPrevious',
  render: (args) => (
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious {...args} />
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
