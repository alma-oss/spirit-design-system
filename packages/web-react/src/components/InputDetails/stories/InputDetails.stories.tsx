import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Link } from '../../Link';
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
      description: 'Content to render, such as links or modal triggers',
    },
    id: {
      control: 'text',
      description: 'ID of the details element',
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
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <InputDetails {...args}>
        <Link elementType="button" color="inherit" underlined="always">
          {args.children}
        </Link>
      </InputDetails>
    </div>
  ),
};
