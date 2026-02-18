import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sizes, ValidationStates } from '../../../constants';
import ReadMe from '../README.md?raw';
import { TextArea } from '..';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
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
    autoResizingMaxHeight: {
      control: 'number',
      table: {
        defaultValue: { summary: '400' },
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
    isAutoResizing: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
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
    maxLength: {
      control: 'number',
    },
    name: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    rows: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: [...Object.values(Sizes), undefined],
      table: {
        defaultValue: { summary: Sizes.MEDIUM },
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
    autoResizingMaxHeight: 400,
    hasValidationIcon: false,
    helperText: 'Helper text',
    id: 'TextArea',
    isAutoResizing: false,
    isDisabled: false,
    isFluid: false,
    isLabelHidden: false,
    isRequired: false,
    label: 'Label',
    maxLength: undefined,
    name: 'TextArea',
    placeholder: 'Placeholder',
    rows: undefined,
    size: Sizes.MEDIUM,
    validationState: undefined,
    validationText: 'Validation text',
    value: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {
  name: 'TextArea',
};
