import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InputPositions, ValidationStates } from '../../../constants';
import ReadMe from '../README.md?raw';
import { Checkbox } from '..';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
    helperText: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    inputPosition: {
      control: 'select',
      options: Object.values(InputPositions),
      table: {
        defaultValue: { summary: InputPositions.START },
      },
      description: 'Position of the input element relative to the label. Can also be a responsive object.',
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isChecked: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    isItem: {
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
    hasValidationIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
    },
  },
  args: {
    autoComplete: 'off',
    hasValidationIcon: false,
    helperText: 'Helper text',
    id: 'checkbox',
    inputPosition: InputPositions.START,
    isChecked: true,
    isDisabled: false,
    isItem: false,
    isLabelHidden: false,
    isRequired: false,
    label: 'Label',
    name: 'checkbox',
    onChange: () => {},
    validationState: undefined,
    validationText: 'Validation text',
    value: 'checkbox',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  name: 'Checkbox',
};
