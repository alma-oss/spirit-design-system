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

const meta: Meta<typeof CardBody> = {
  title: 'Components/Card',
  component: CardBody,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Text to display in the CardBody.',
    },
    isSelectable: {
      control: 'boolean',
      description: 'Whether the CardBody is selectable. CardTitle must be as link.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    children: 'CardBody Text',
    isSelectable: false,
  },
};

export default meta;
type Story = StoryObj<typeof CardBody>;

export const CardBodyPlayground: Story = {
  name: 'CardBody',
  render: (args) => {
    const { children } = args;

    return (
      <Container>
        <Card>
          <CardMedia size="medium">{MEDIA_IMAGE}</CardMedia>
          <CardLogo>
            <PartnerLogo size="medium" hasSafeArea>
              {LOGO}
            </PartnerLogo>
          </CardLogo>
          <CardBody {...args}>
            <CardEyebrow>Card eyebrow</CardEyebrow>
            <CardTitle>
              <CardLink href="#">Card Title</CardLink>
            </CardTitle>
            <p>{children}</p>
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
