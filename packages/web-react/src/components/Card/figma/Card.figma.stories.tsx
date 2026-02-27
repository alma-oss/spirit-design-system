import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { type ComponentProps, type ReactNode } from 'react';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import Card from '../Card';
import CardArtwork from '../CardArtwork';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardTitle from '../CardTitle';

const figmaCardFooter = (
  <CardFooter>
    <Button>Button</Button>
    <Button color="secondary">Button</Button>
  </CardFooter>
);

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Figma',
  component: Card,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: '<FIGMA_FILE_ID>?node-id=37173%3A1977',
      props: {
        artwork: figma.boolean('Artwork', {
          true: (
            <CardArtwork>
              <Icon name="file" />
            </CardArtwork>
          ),
          false: undefined,
        }),
        direction: figma.enum('Artwork placement', {
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
        paragraph: figma.boolean('Paragraph text', {
          true: <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor.</p>,
          false: undefined,
        }),
      },
      examples: ['FigmaCard'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const FigmaCard: Story = {
  name: 'Card',
  render: ({
    artwork = undefined,
    eyebrow = undefined,
    footer = undefined,
    paragraph = undefined,
    ...props
  }: ComponentProps<typeof Card> & {
    artwork?: ReactNode;
    eyebrow?: ReactNode;
    footer?: ReactNode;
    paragraph?: ReactNode;
  }) => (
    <Card {...props}>
      {artwork}
      <CardBody>
        {eyebrow}
        <CardTitle isHeading>The heading of your card</CardTitle>
        {paragraph}
      </CardBody>
      {footer}
    </Card>
  ),
};
