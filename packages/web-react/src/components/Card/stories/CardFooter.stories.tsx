import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlignmentX } from '../../../constants';
import { ButtonLink } from '../../ButtonLink';
import { Container } from '../../Container';
import { PartnerLogo } from '../../PartnerLogo';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardLogo from '../CardLogo';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';
import { LOGO, MEDIA_IMAGE } from '../demo/constants';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof CardFooter> = {
  title: 'Components/Card',
  component: CardFooter,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    alignmentX: {
      control: 'select',
      description: 'Alignment inside CardFooter component.',
      options: [...Object.values(AlignmentX)],
      table: {
        defaultValue: { summary: AlignmentX.LEFT },
      },
    },
    children: {
      control: 'object',
      description: 'Content to display in the CardFooter.',
    },
  },
  args: {
    alignmentX: AlignmentX.LEFT,
    children: (
      <>
        <ButtonLink href="#" color="primary">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary">
          Secondary
        </ButtonLink>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof CardFooter>;

export const CardFooterPlayground: Story = {
  name: 'CardFooter',
  render: (args) => {
    const { children } = args;

    return (
      <Container>
        <Card isBoxed>
          <CardMedia isExpanded>{MEDIA_IMAGE}</CardMedia>
          <CardLogo>
            <PartnerLogo size="medium" hasSafeArea>
              {LOGO}
            </PartnerLogo>
          </CardLogo>
          <CardBody>
            <CardEyebrow>Card Title</CardEyebrow>
            <CardTitle>Card Title</CardTitle>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida,
              nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat. Morbi
              fringilla convallis sapien. Sed ac felis. Aliquam erat volutpat. Aliquam euismod. Aenean vel lectus. Nunc
              imperdiet justo nec dolor.
            </p>
          </CardBody>
          <CardFooter {...args}>{children}</CardFooter>
        </Card>
      </Container>
    );
  },
};
