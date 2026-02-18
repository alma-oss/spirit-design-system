import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import { Container } from '../../Container';
import { PartnerLogo } from '../../PartnerLogo';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardLink from '../CardLink';
import CardLogo from '../CardLogo';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';
import { LOGO, MEDIA_IMAGE } from '../demo/constants';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof CardLink> = {
  title: 'Components/Card',
  component: CardLink,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Text to display in the CardLink.',
    },
    elementType: {
      control: 'text',
      description: 'Element type for the CardLink href="#" component.',
      table: {
        defaultValue: { summary: 'a' },
      },
    },
    href: {
      control: 'text',
      description: 'URL to link to.',
    },
  },
  args: {
    children: 'Card Link Title',
    elementType: 'a',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof CardLink>;

export const CardLinkPlayground: Story = {
  name: 'CardLink',
  render: (args) => {
    const { children } = args;

    return (
      <Container>
        <Card>
          <CardMedia isExpanded>{MEDIA_IMAGE}</CardMedia>
          <CardLogo>
            <PartnerLogo size="medium" hasSafeArea>
              {LOGO}
            </PartnerLogo>
          </CardLogo>
          <CardBody>
            <CardEyebrow>Card eyebrow</CardEyebrow>
            <CardTitle>
              <CardLink {...args}>{children}</CardLink>
            </CardTitle>
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
    );
  },
};
