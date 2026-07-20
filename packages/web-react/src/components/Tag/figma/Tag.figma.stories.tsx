import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import Tag from '../Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Figma',
  component: Tag,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=1980%3A4090',
      props: {
        color: figma.enum('Color', {
          Informative: 'informative',
          Success: 'success',
          Warning: 'warning',
          Danger: 'danger',
        }),
        isSubtle: figma.boolean('Subtle'),
        size: figma.enum('Size', {
          XLarge: 'xlarge',
          Large: 'large',
          Small: 'small',
          XSmall: 'xsmall',
        }),
      },
      examples: ['FigmaPlayground'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const FigmaPlayground: Story = {
  name: 'Tag',
  render: (props) => <Tag {...props}>Label</Tag>,
};
