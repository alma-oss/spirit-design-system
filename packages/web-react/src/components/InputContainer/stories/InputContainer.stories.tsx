import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Sizes, ValidationStates } from '../../../constants';
import ReadMe from '../README.md?raw';
import { InputContainer } from '..';

const meta: Meta<typeof InputContainer> = {
  title: 'Components/InputContainer',
  component: InputContainer,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['elementType'] },
  },
  argTypes: {
    children: {
      control: 'select',
      options: ['Input', 'TextArea', 'Select'],
      description: 'This is the place for the content of the InputContainer. Place Input, TextArea or Select inside.',
      mapping: {
        Input: <input type="text" placeholder="Input" />,
        TextArea: <textarea placeholder="TextArea" />,
        Select: (
          <select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        ),
      },
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: [undefined, ...Object.values(Sizes)],
      table: {
        defaultValue: { summary: Sizes.MEDIUM },
      },
    },
    validationState: {
      control: 'select',
      options: [undefined, ...Object.values(ValidationStates)],
    },
  },
  args: {
    children: 'Input',
    isDisabled: false,
    size: Sizes.MEDIUM,
    validationState: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof InputContainer>;

export const Playground: Story = {
  name: 'InputContainer',
};
