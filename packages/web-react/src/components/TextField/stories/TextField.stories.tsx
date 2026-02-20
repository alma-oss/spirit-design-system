import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sizes, ValidationStates } from '../../../constants';
import ReadMe from '../README.md?raw';
import { TextField } from '..';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['hasValidationStateIcon'] },
  },
  argTypes: {
    autoComplete: {
      control: 'text',
    },
    hasPasswordToggle: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasValidationIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    helperText: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isFluid: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    isLabelHidden: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isRequired: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    pattern: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: [...Object.values(Sizes), undefined],
      table: {
        defaultValue: { summary: Sizes.MEDIUM },
      },
    },
    type: {
      control: 'select',
      options: ['email', 'number', 'password', 'search', 'tel', 'text', 'url'],
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    validationState: {
      control: 'select',
      options: [...Object.values(ValidationStates), undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    validationText: {
      control: 'object',
      description:
        'The validation text. Only visible if validationState is set. Use a string `"foo"` for single validation text or an array for multiple validation texts `["foo", "bar"]`.',
    },
    value: {
      control: 'text',
    },
  },
  args: {
    autoComplete: 'off',
    hasPasswordToggle: false,
    hasValidationIcon: false,
    helperText: 'Helper text',
    id: 'TextField',
    isDisabled: false,
    isFluid: false,
    isLabelHidden: false,
    isRequired: false,
    label: 'Label',
    name: 'TextField',
    pattern: undefined,
    placeholder: 'Placeholder',
    size: Sizes.MEDIUM,
    type: 'text',
    validationState: undefined,
    validationText: 'Validation text',
    value: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  name: 'TextField',
};
