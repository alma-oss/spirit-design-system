import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import InputDetailsCheckbox from '../demo/InputDetailsCheckbox';
import InputDetailsToggle from '../demo/InputDetailsToggle';
import ReadMe from '../README.md?raw';
import { InputDetails } from '..';

const meta: Meta<typeof InputDetails> = {
  title: 'Components/InputDetails',
  component: InputDetails,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['elementType', 'registerAriaDetails'] },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
  },
  args: {
    children: 'See full terms and conditions',
    id: 'input-details',
  },
};

export default meta;
type Story = StoryObj<typeof InputDetails>;

export const Playground: Story = {
  name: 'InputDetails',
};

export const WithCheckbox: Story = {
  name: 'Usage with Checkbox',
  render: () => <InputDetailsCheckbox />,
  parameters: {
    controls: { disable: true },
  },
};

export const WithToggle: Story = {
  name: 'Usage with Toggle',
  render: () => <InputDetailsToggle />,
  parameters: {
    controls: { disable: true },
  },
};
