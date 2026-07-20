import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import Radio from '../Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio/Figma',
  component: Radio,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=830%3A1204',
      props: {
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
      },
      examples: ['FigmaPlayground'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const FigmaPlayground: Story = {
  name: 'Radio',
  render: ({
    helperTextProps = {},
    label,
    ...props
  }: React.ComponentProps<typeof Radio> & { helperTextProps?: { helperText?: string } }) => (
    <Radio {...props} helperText={helperTextProps.helperText} id="radio-default" label={label} />
  ),
};
