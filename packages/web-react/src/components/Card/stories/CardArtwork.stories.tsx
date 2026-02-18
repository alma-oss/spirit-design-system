import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlignmentX } from '../../../constants';
import { ButtonLink } from '../../ButtonLink';
import { Container } from '../../Container';
import { Icon } from '../../Icon';
import Card from '../Card';
import CardArtwork from '../CardArtwork';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardTitle from '../CardTitle';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof CardArtwork> = {
  title: 'Components/Card',
  component: CardArtwork,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    alignmentX: {
      control: 'select',
      description: 'Alignment inside CardArtwork component.',
      options: [...Object.values(AlignmentX)],
      table: {
        defaultValue: { summary: AlignmentX.LEFT },
      },
    },
  },
  args: {
    alignmentX: AlignmentX.LEFT,
  },
};

export default meta;
type Story = StoryObj<typeof CardArtwork>;

export const CardArtworkPlayground: Story = {
  name: 'CardArtwork',
  render: (args) => (
    <Container>
      <Card isBoxed>
        <CardArtwork {...args}>
          <Icon name="file" />
        </CardArtwork>
        <CardBody>
          <CardEyebrow>Card eyebrow</CardEyebrow>
          <CardTitle>Card Title</CardTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida,
            nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat. Morbi
            fringilla convallis sapien. Sed ac felis. Aliquam erat volutpat. Aliquam euismod. Aenean vel lectus. Nunc
            imperdiet justo nec dolor.
          </p>
        </CardBody>
        <CardFooter>
          <ButtonLink href="#" color="primary">
            Primary
          </ButtonLink>
          <ButtonLink href="#" color="secondary">
            Secondary
          </ButtonLink>
        </CardFooter>
      </Card>
    </Container>
  ),
};
