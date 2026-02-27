import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { SpiritCheckboxProps } from '../../../types';
import { Checkbox } from '..';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Figma',
  component: Checkbox,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: '<FIGMA_FILE_ID>?node-id=830%3A292',
      props: {
        indeterminate: figma.boolean('Indeterminate'),
        isChecked: figma.boolean('Selected'),
        isDisabled: figma.boolean('Disabled'),
        helperTextProps: figma.boolean('Helper', {
          true: figma.nestedProps('Helper text', {
            helperText: figma.textContent('Helper text'),
          }),
          false: { helperText: undefined },
        }),
        label: figma.string('Label text'),
        validationState: figma.enum('Validation State', {
          Success: 'success',
          Warning: 'warning',
          Danger: 'danger',
        }),
        validationTextProps: figma.nestedProps('Validation text', {
          validationText: figma.string('Message'),
        }),
      },
      examples: ['FigmaPlayground'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const FigmaPlayground: Story = {
  name: 'Checkbox',
  render: ({
    helperTextProps = {},
    label,
    validationTextProps = {},
    ...props
  }: SpiritCheckboxProps & {
    helperTextProps?: { helperText?: string };
    validationTextProps?: { validationText?: string };
  }) => (
    <Checkbox
      {...props}
      helperText={helperTextProps.helperText}
      id="checkbox-default"
      label={label}
      validationText={validationTextProps.validationText}
    />
  ),
};
