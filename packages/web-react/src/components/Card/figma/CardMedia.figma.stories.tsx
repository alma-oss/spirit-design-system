import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { type ComponentProps, type ReactNode } from 'react';
import { Button } from '../../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';

const figmaCardFooter = (
  <CardFooter>
    <Button>Button</Button>
    <Button color="secondary">Button</Button>
  </CardFooter>
);

const meta: Meta<typeof CardMedia> = {
  title: 'Components/Card/Figma',
  component: CardMedia,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: '<FIGMA_FILE_ID>?node-id=37201%3A1917',
      props: {
        direction: figma.enum('Photo placement', {
          Left: 'horizontal',
          Right: 'horizontal-reversed',
        }),
        eyebrow: figma.boolean('Eyebrow', {
          true: <CardEyebrow>Eyebrow title</CardEyebrow>,
          false: undefined,
        }),
        footer: figma.boolean('Action', {
          true: figmaCardFooter,
          false: undefined,
        }),
        isBoxed: figma.boolean('Boxed'),
        isCardMediaExpanded: figma.boolean('Photo boxed'),
        paragraph: figma.boolean('Paragraph text', {
          true: <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor.</p>,
          false: undefined,
        }),
      },
      examples: ['FigmaCardMedia'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardMedia>;

export const FigmaCardMedia: Story = {
  name: 'Card Media',
  render: ({
    eyebrow = undefined,
    footer = undefined,
    isCardMediaExpanded,
    paragraph = undefined,
  }: ComponentProps<typeof CardMedia> & {
    eyebrow?: ReactNode;
    footer?: ReactNode;
    isCardMediaExpanded?: boolean;
    paragraph?: ReactNode;
  }) => (
    <Card>
      <CardMedia isExpanded={isCardMediaExpanded}>Replace with image</CardMedia>
      <CardBody>
        {eyebrow}
        <CardTitle isHeading>The heading of your card</CardTitle>
        {paragraph}
      </CardBody>
      {footer}
    </Card>
  ),
};
