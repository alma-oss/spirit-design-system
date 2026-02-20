import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlignmentYExtended } from '../../../constants';
import { Box } from '../../Box';
import { Text } from '../../Text';
import Navigation from '../Navigation';
import NavigationItem from '../NavigationItem';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof NavigationItem> = {
  title: 'Components/Navigation',
  component: NavigationItem,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    alignmentY: {
      control: 'select',
      options: [AlignmentYExtended.CENTER, AlignmentYExtended.STRETCH],
      table: {
        defaultValue: { summary: AlignmentYExtended.CENTER },
      },
    },
  },
  args: {
    alignmentY: AlignmentYExtended.CENTER,
    children: (
      <Box backgroundColor="secondary" padding="space-600">
        <Text emphasis="bold" size="small">
          Content
        </Text>
      </Box>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof NavigationItem>;

export const NavigationItemPlayground: Story = {
  name: 'NavigationItem',
  render: (args) => (
    <Navigation UNSAFE_style={{ height: '100px' }}>
      <NavigationItem {...args} />
    </Navigation>
  ),
};
