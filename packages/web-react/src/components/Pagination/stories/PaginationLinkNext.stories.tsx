import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Pagination, PaginationItem, PaginationLink, PaginationLinkNext, PaginationLinkPrevious } from '..';

const meta: Meta<typeof PaginationLinkNext> = {
  title: 'Components/Pagination',
  component: PaginationLinkNext,
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
    strings: { ariaLabelNext: 'Next' },
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
        <PaginationLink
          href="#"
          pageNumber={11}
          strings={{
            ariaLabel: 'Go to Page 11',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={12}
          strings={{
            ariaLabel: 'Go to Page 12',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={13}
          strings={{
            ariaLabel: 'Current Page, Page 13',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={14}
          strings={{
            ariaLabel: 'Go to Page 14',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={15}
          strings={{
            ariaLabel: 'Go to Page 15',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext {...args} />
      </PaginationItem>
    </Pagination>
  ),
};
