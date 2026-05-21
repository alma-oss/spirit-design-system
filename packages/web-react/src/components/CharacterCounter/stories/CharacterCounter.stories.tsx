import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ValidationStates } from '../../../constants';
import { FormFieldModes } from '../../../types';
import ReadMe from '../README.md?raw';
import { CharacterCounter } from '..';

const meta: Meta<typeof CharacterCounter> = {
  title: 'Components/CharacterCounter',
  component: CharacterCounter,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    counterThreshold: {
      control: 'number',
    },
    currentLength: {
      control: 'number',
    },
    formFieldMode: {
      control: 'select',
      options: [undefined, ...Object.values(FormFieldModes)],
    },
    hasCounter: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    validationState: {
      control: 'select',
      options: [undefined, ...Object.values(ValidationStates)],
    },
  },
  args: {
    id: 'storybook-character-counter',
    counterThreshold: 200,
    currentLength: 0,
  },
};

export default meta;
type Story = StoryObj<typeof CharacterCounter>;

export const Playground: Story = {
  name: 'CharacterCounter',
  render: (args) => <CharacterCounter {...args} />,
};
