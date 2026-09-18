import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Placements, SizesExtended } from '../../../constants';
import { DEFAULT_PLACEMENT } from '../constants';
import ReadMe from '../README.md?raw';
import { ContextualHelp } from '..';

const meta: Meta<typeof ContextualHelp> = {
  title: 'Components/ContextualHelp',
  component: ContextualHelp,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' },
    icon: { control: 'object', table: { defaultValue: { summary: "'info'" } } },
    id: { control: 'text' },
    isDismissible: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    label: { control: 'text' },
    placement: {
      control: 'select',
      options: Object.values(Placements),
      table: { defaultValue: { summary: DEFAULT_PLACEMENT } },
    },
    size: {
      control: 'select',
      options: Object.values(SizesExtended),
      table: { defaultValue: { summary: SizesExtended.SMALL } },
    },
  },
  args: {
    children: 'Choose all languages you can use.',
    icon: 'info',
    id: 'contextual-help-example',
    isDismissible: false,
    label: 'More information about Languages',
    placement: DEFAULT_PLACEMENT,
    size: SizesExtended.SMALL,
  },
};

export default meta;
type Story = StoryObj<typeof ContextualHelp>;

export const Playground: Story = {
  name: 'ContextualHelp',
};
