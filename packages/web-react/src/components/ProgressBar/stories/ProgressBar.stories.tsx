import { accentColors } from '@alma-oss/spirit-design-tokens';
import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { EmotionColors, ValidationStates } from '../../../constants';
import { type AccentColorNamesType } from '../../../types';
import ReadMe from '../README.md?raw';
import { ProgressBar, ProgressBarColorsExtended } from '..';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        ...Object.values(EmotionColors),
        ...Object.values(ProgressBarColorsExtended),
        ...(Object.keys(accentColors) as AccentColorNamesType[]),
      ],
      table: {
        defaultValue: { summary: 'informative' },
      },
    },
    helperText: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isLabelHidden: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
    },
    max: {
      control: 'number',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    validationState: {
      control: 'select',
      options: [...Object.values(ValidationStates), undefined],
    },
    validationText: {
      control: 'text',
    },
    value: {
      control: 'number',
    },
    valuePlacement: {
      control: 'select',
      options: ['right', 'bottom'],
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    valueText: {
      control: 'text',
    },
  },
  args: {
    'aria-label': 'Profile completeness',
    color: 'informative',
    isDisabled: false,
    max: 100,
    value: 60,
    valuePlacement: 'right',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {
  name: 'ProgressBar',
};
