import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import { SizesExtended, TextAlignments } from '../../../constants';
import ReadMe from '../README.md?raw';
import { Container } from '..';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'object',
    },
    isFluid: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: [...Object.values(SizesExtended)],
      table: {
        defaultValue: { summary: SizesExtended.XLARGE },
      },
    },
    textAlignment: {
      control: 'select',
      options: [...Object.values(TextAlignments), undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
  },
  args: {
    children: <DocsBox>Container</DocsBox>,
    isFluid: false,
    textAlignment: TextAlignments.LEFT,
    size: SizesExtended.XLARGE,
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Playground: Story = {
  name: 'Container',
};
