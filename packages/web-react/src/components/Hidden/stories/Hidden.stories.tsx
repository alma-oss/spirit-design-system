import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Hidden from '../Hidden';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof Hidden> = {
  title: 'Components/Hidden',
  component: Hidden,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    elementType: {
      control: 'text',
      table: {
        defaultValue: {
          summary: 'span',
        },
      },
    },
    on: {
      control: 'select',
      options: ['mobile', 'tablet', 'desktop', ['mobile', 'tablet'], undefined],
      table: {
        type: {
          summary: 'BreakpointToken | BreakpointToken[]',
        },
      },
    },
    from: {
      control: 'select',
      options: ['mobile', 'tablet', 'desktop', undefined],
      table: {
        type: {
          summary: 'BreakpointToken',
        },
      },
    },
  },
  args: {
    elementType: 'span',
    on: undefined,
    from: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Hidden>;

export const Playground: Story = {
  name: 'Hidden',
  render: (args: typeof meta.args) => (
    <Hidden {...args}>
      <p>
        This content visibility depends on the <code>on</code> and <code>from</code> props. Try changing the viewport
        size or modifying the controls.
      </p>
    </Hidden>
  ),
};
