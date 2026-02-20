import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import { ValidationStates } from '../../../constants';
import { Checkbox } from '../../Checkbox';
import { Radio } from '../../Radio';
import ReadMe from '../README.md?raw';
import { FieldGroup } from '..';

const meta: Meta<typeof FieldGroup> = {
  title: 'Components/FieldGroup',
  component: FieldGroup,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['hasValidationStateIcon'] },
  },
  argTypes: {
    children: {
      control: 'select',
      options: ['boxes', 'radios', 'checkboxes'],
      description: `This is the place for the content of the FieldGroup. In the real code
        you can pass in any children you want. In this demo we have predefined options:
        \`boxes\`, \`radios\` and \`checkboxes\`. Please note the predefined options
        in this demo are not customizable.`,
      mapping: {
        boxes: (
          <>
            <DocsBox>Item</DocsBox>
            <DocsBox>Item</DocsBox>
            <DocsBox>Item</DocsBox>
          </>
        ),
        radios: (
          <>
            <Radio label="Radio 1" name="radio" id="radio-1" />
            <Radio label="Radio 2" name="radio" id="radio-2" />
          </>
        ),
        checkboxes: (
          <>
            <Checkbox label="Checkbox 1" name="checkbox" id="checkbox-1" />
            <Checkbox label="Checkbox 2" name="checkbox" id="checkbox-2" />
          </>
        ),
      },
    },
    form: {
      control: 'text',
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
  },
  args: {
    children: 'boxes',
    hasValidationIcon: false,
    helperText: 'Helper text',
    id: 'field-group',
    isDisabled: false,
    isFluid: false,
    isLabelHidden: false,
    isRequired: false,
    label: 'Label',
    name: 'FieldGroup',
    validationState: undefined,
    validationText: 'Validation text',
  },
};

export default meta;
type Story = StoryObj<typeof FieldGroup>;

export const Playground: Story = {
  name: 'FieldGroup',
};
