import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
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
        <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 1" pageNumber={1} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 2" pageNumber={2} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 3" pageNumber={3} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 4" pageNumber={4} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 5" pageNumber={5} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>
  ),
};
