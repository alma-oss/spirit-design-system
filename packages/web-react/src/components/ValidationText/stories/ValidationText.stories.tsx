import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ValidationStates } from '../../../constants';
import { FormFieldModes } from '../../../types';
import ReadMe from '../README.md?raw';
import { ValidationText } from '..';

const meta: Meta<typeof ValidationText> = {
  title: 'Components/ValidationText',
  component: ValidationText,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    formFieldMode: {
      control: 'select',
      options: Object.values(FormFieldModes),
    },
    isDisabled: {
      control: 'boolean',
    },
    role: {
      control: 'text',
    },
    validationStateIcon: {
      control: 'select',
      options: Object.values(ValidationStates),
    },
    validationText: {
      control: 'text',
    },
  },
  args: {
    elementType: 'div',
    id: 'validation-text',
    isDisabled: false,
    role: 'alert',
    validationStateIcon: 'danger',
    validationText: 'Danger validation text',
  },
};

export default meta;
type Story = StoryObj<typeof ValidationText>;

export const Playground: Story = {
  name: 'ValidationText',
};
