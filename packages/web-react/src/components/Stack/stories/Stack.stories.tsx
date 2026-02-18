import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import ReadMe from '../README.md?raw';
import { Stack } from '..';

const meta: Meta<typeof Stack> = {
  title: 'Components/Stack',
  component: Stack,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'object',
    },
    elementType: {
      control: 'text',
    },
    hasEndDivider: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasIntermediateDividers: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasSpacing: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasStartDivider: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    spacing: {
      control: 'object',
    },
  },
  args: {
    children: (
      <>
        {[...Array(3)].map((_, index) => {
          const key = `item-${index}`;

          return (
            <li key={key}>
              <DocsBox>Item</DocsBox>
            </li>
          );
        })}
      </>
    ),
    elementType: 'ul',
    hasEndDivider: false,
    hasIntermediateDividers: false,
    hasSpacing: false,
    hasStartDivider: false,
    spacing: {
      mobile: 'space-500',
      tablet: 'space-600',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Playground: Story = {
  name: 'Stack',
};
