import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import { Grid, GridItem } from '..';

const meta: Meta<typeof GridItem> = {
  title: 'Components/Grid',
  component: GridItem,
  argTypes: {
    children: {
      control: 'object',
    },
    columnEnd: {
      control: 'object',
    },
    columnStart: {
      control: 'object',
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    rowEnd: {
      control: 'object',
    },
    rowStart: {
      control: 'object',
    },
  },
  args: {
    children: <DocsBox size="small">GridItem</DocsBox>,
    columnEnd: { mobile: 12, tablet: 6 },
    columnStart: 1,
    elementType: 'div',
    rowEnd: 1,
    rowStart: 1,
  },
};

export default meta;
type Story = StoryObj<typeof GridItem>;

export const GridItemPlayground: Story = {
  name: 'GridItem',
  render: (args) => (
    <Grid>
      <GridItem {...args} />
    </Grid>
  ),
};
