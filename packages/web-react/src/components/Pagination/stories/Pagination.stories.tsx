import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import ReadMe from '../README.md?raw';
import { Pagination, PaginationItem, PaginationLink, PaginationLinkNext } from '..';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'object',
    },
    listProps: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {
  name: 'Pagination',
  render: (args) => (
    <Pagination {...args}>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={1}
          strings={{
            ariaLabel: { page: 'Current Page, Page 1' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={2}
          strings={{
            ariaLabel: { page: 'Go to Page 2' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={3}
          strings={{
            ariaLabel: { page: 'Go to Page 3' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={4}
          strings={{
            ariaLabel: { page: 'Go to Page 4' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={5}
          strings={{
            ariaLabel: { page: 'Go to Page 5' },
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>
  ),
};
