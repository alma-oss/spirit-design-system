import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TextColors } from '../../../constants';
import ReadMe from '../README.md?raw';
import { Spinner } from '..';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [...Object.values(TextColors), undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
  },
  args: {
    color: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {
  name: 'Spinner',
};
