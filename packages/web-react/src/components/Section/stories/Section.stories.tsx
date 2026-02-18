import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BackgroundColors, SizesExtended, TextAlignments } from '../../../constants';
import ReadMe from '../README.md?raw';
import { Section } from '..';

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
  component: Section,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    backgroundColor: {
      control: 'select',
      options: Object.values(BackgroundColors),
      table: {
        type: {
          summary: 'BackgroundColorsDictionaryType',
        },
      },
    },
    containerProps: {
      control: 'object',
      table: {
        type: {
          summary: 'ContainerProps',
        },
      },
    },
    hasContainer: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    paddingY: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingTop: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingBottom: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    size: {
      control: 'select',
      options: [...Object.values(SizesExtended)],
      table: {
        defaultValue: { summary: undefined },
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
    backgroundColor: undefined,
    children: 'Section',
    hasContainer: true,
    size: undefined,
    textAlignment: TextAlignments.LEFT,
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Playground: Story = {
  name: 'Section',
};
