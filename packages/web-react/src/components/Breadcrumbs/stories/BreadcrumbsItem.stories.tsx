import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Breadcrumbs, BreadcrumbsItem } from '..';

const meta: Meta<typeof BreadcrumbsItem> = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsItem,
  argTypes: {
    iconNameEnd: {
      control: 'text',
      table: {
        defaultValue: { summary: 'chevron-right' },
      },
    },
    iconNameStart: {
      control: 'text',
      table: {
        defaultValue: { summary: 'chevron-left' },
      },
    },
    isCurrent: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    isGoBackOnly: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    href: '#currentUrl',
    isCurrent: true,
    children: 'Current page',
  },
};

export default meta;
type Story = StoryObj<typeof BreadcrumbsItem>;

export const BreadcrumbsItemPlayground: Story = {
  name: 'BreadcrumbsItem',
  render: (args) => (
    <Breadcrumbs>
      <BreadcrumbsItem href="#rootUrl">Root</BreadcrumbsItem>
      <BreadcrumbsItem href="#categoryUrl">Category</BreadcrumbsItem>
      <BreadcrumbsItem href="#subcategoryUrl">Subcategory</BreadcrumbsItem>
      <BreadcrumbsItem href="#subcategoryUrl" isGoBackOnly>
        Back
      </BreadcrumbsItem>
      <BreadcrumbsItem {...args} />
    </Breadcrumbs>
  ),
};
