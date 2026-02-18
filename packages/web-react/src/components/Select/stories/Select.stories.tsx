import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sizes, ValidationStates } from '../../../constants';
import ReadMe from '../README.md?raw';
import { Select } from '..';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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
    children: {
      control: 'select',
      options: ['simple', 'placeholder', 'placeholder & disabled', 'suboptions'],
      description: `This is the place for the content of the Select. In the real code you can
        pass in any usuall \`<select>\` children. In this demo we have predefined options:
        \`simple\`, \`placeholder\`, \`placeholder & disabled\` and \`suboptions\`. Please note
        the predefined options in this demo are not customizable.`,
      mapping: {
        simple: (
          <>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </>
        ),
        placeholder: (
          <>
            <option value="" selected>
              Select an option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </>
        ),
        'placeholder & disabled': (
          <>
            <option value="" selected disabled>
              Select an option [selected & disabled]
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </>
        ),
        suboptions: (
          <>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <optgroup label="Sub options">
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
            </optgroup>
          </>
        ),
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
        defaultValue: { summary: 'undefined' },
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
    children: 'placeholder & disabled',
    hasValidationIcon: false,
    helperText: 'Helper text',
    id: 'Select',
    isDisabled: false,
    isFluid: false,
    isLabelHidden: false,
    isRequired: false,
    label: 'Label',
    name: 'Select',
    size: Sizes.MEDIUM,
    validationState: undefined,
    validationText: 'Validation text',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  name: 'Select',
};
