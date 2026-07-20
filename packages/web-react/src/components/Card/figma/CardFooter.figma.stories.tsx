import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../../Button';
import { Link } from '../../Link';
import CardFooter from '../CardFooter';

const meta: Meta<typeof CardFooter> = {
  title: 'Components/Card/Figma',
  component: CardFooter,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=37173%3A2291',
      props: {},
      examples: [
        { example: 'FigmaCardFooterLinks', variant: { Type: 'Links' } },
        { example: 'FigmaCardFooterButtons', variant: { Type: 'Buttons' } },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardFooter>;

export const FigmaCardFooterLinks: Story = {
  name: 'CardFooter Links',
  render: (props) => (
    <CardFooter {...props}>
      <Link href="#link">Link primary</Link>
      <Link href="#link" color="secondary">
        Link secondary
      </Link>
    </CardFooter>
  ),
};

export const FigmaCardFooterButtons: Story = {
  name: 'CardFooter Buttons',
  render: (props) => (
    <CardFooter {...props}>
      <Button size="small">Button</Button>
      <Button color="secondary" size="small">
        Button
      </Button>
    </CardFooter>
  ),
};
