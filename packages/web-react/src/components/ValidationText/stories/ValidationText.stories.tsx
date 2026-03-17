import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ValidationStates } from '../../../constants';
import { FormFieldVariants } from '../../../types';
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
    formFieldVariant: {
      control: 'select',
      options: Object.values(FormFieldVariants),
    },
    hasValidationStateIcon: {
      control: 'select',
      options: Object.values(ValidationStates),
    },
    isDisabled: {
      control: 'boolean',
    },
    role: {
      control: 'text',
    },
    validationText: {
      control: 'text',
    },
  },
  args: {
    elementType: 'div',
    hasValidationStateIcon: 'danger',
    id: 'validation-text',
    isDisabled: false,
    role: 'alert',
    validationText: 'Danger validation text',
  },
};

export default meta;
type Story = StoryObj<typeof ValidationText>;

export const Playground: Story = {
  name: 'ValidationText',
};
