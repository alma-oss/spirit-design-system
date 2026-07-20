import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import Toggle from '../Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle/Figma',
  component: Toggle,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=18817%3A40',
      props: {
        isChecked: figma.boolean('Selected'),
        isDisabled: figma.boolean('Disabled'),
      },
      examples: ['FigmaInput'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const FigmaInput: Story = {
  name: 'Toggle Input',
  render: (props) => <Toggle {...props} id="toggle-example" label="Label" isLabelHidden />,
};
