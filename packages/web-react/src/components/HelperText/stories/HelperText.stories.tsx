import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FormFieldVariants } from '../../../types';
import ReadMe from '../README.md?raw';
import { HelperText } from '..';

const meta: Meta<typeof HelperText> = {
  title: 'Components/HelperText',
  component: HelperText,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    elementType: {
      control: 'select',
      options: ['div', 'span'],
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    helperText: {
      control: 'text',
    },
    formFieldVariant: {
      control: 'select',
      options: Object.values(FormFieldVariants),
    },
  },
  args: {
    elementType: 'div',
    helperText: 'Helper text',
  },
};

export default meta;
type Story = StoryObj<typeof HelperText>;

export const Playground: Story = {
  name: 'HelperText',
};
