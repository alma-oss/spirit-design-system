import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlignmentXExtended, AlignmentYExtended, DirectionExtended } from '../../../constants';
import { Button } from '../../Button';
import ReadMe from '../README.md?raw';
import { ActionGroup } from '..';

const meta: Meta<typeof ActionGroup> = {
  title: 'Components/ActionGroup',
  component: ActionGroup,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    alignmentX: {
      control: 'select',
      options: [undefined, ...Object.values(AlignmentXExtended)],
      table: {
        defaultValue: { summary: AlignmentXExtended.LEFT },
      },
    },
    alignmentY: {
      control: 'select',
      options: [undefined, ...Object.values(AlignmentYExtended)],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    direction: {
      control: 'select',
      options: [undefined, ...Object.values(DirectionExtended)],
      table: {
        defaultValue: { summary: DirectionExtended.HORIZONTAL },
      },
    },
    spacing: {
      control: 'object',
    },
    spacingX: {
      control: 'object',
    },
    spacingY: {
      control: 'object',
    },
  },
  args: {
    alignmentX: AlignmentXExtended.LEFT,
    direction: DirectionExtended.HORIZONTAL,
    spacing: {
      mobile: 'space-600',
      tablet: 'space-800',
      desktop: 'space-1000',
    },
    spacingX: {
      mobile: 'space-600',
      tablet: 'space-800',
      desktop: 'space-1000',
    },
    spacingY: {
      mobile: 'space-600',
      tablet: 'space-800',
      desktop: 'space-1000',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionGroup>;

export const Playground: Story = {
  name: 'ActionGroup',
  render: (args) => (
    <ActionGroup {...args}>
      <Button color="primary">Primary Action</Button>
      <Button color="secondary">Secondary Action</Button>
      <Button color="tertiary">Tertiary Action</Button>
    </ActionGroup>
  ),
};
