import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Icon } from '../../Icon';
import { Button } from '..';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Figma',
  component: Button,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: '<FIGMA_FILE_ID>?node-id=776%3A20',
      props: {
        color: figma.enum('Color', {
          Secondary: 'secondary',
          Tertiary: 'tertiary',
          Success: 'success',
          Warning: 'warning',
          Danger: 'danger',
          Informative: 'informative',
          Plain: 'plain',
        }),
        isDisabled: figma.boolean('Disabled'),
        isLoading: figma.boolean('Loading'),
        size: figma.enum('Size', {
          Large: 'large',
          Small: 'small',
        }),
        children: figma.textContent('Action'),
      },
      examples: [
        { example: 'FigmaText', variant: { Content: 'Text' } },
        { example: 'FigmaTextAndIcon', variant: { Content: 'Text-and-icon' } },
        { example: 'FigmaIcon', variant: { Content: 'Icon' } },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FigmaText: Story = {
  name: 'Text',
  render: ({ children, ...props }) => <Button {...props}>{children}</Button>,
};

export const FigmaTextAndIcon: Story = {
  name: 'Text and Icon',
  render: ({ children, ...props }) => (
    <Button {...props}>
      <Icon name="placeholder" marginRight="space-500" />
      {children}
    </Button>
  ),
};

export const FigmaIcon: Story = {
  name: 'Icon',
  args: { isSymmetrical: true },
  render: (props) => (
    <Button {...props}>
      <Icon name="placeholder" />
    </Button>
  ),
};
