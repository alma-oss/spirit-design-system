import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BackgroundColors, ObjectFit } from '../../../constants';
import { CardSizes } from '../../../types';
import { getAccentBackgroundColors, getEmotionBackgroundColors } from '../../../utils';
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

const accentBackgroundColorsObject = getAccentBackgroundColors();
const emotionBackgroundColorsObject = getEmotionBackgroundColors();

const meta: Meta<typeof CardMedia> = {
  title: 'Components/Card',
  component: CardMedia,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    backgroundColor: {
      control: 'select',
      description: 'Background color of the CardMedia.',
      options: [
        ...Object.values(BackgroundColors),
        ...[...Object.values(accentBackgroundColorsObject), ...Object.values(emotionBackgroundColorsObject)],
        undefined,
      ],
      table: {
        type: {
          summary: 'BackgroundColorsDictionaryType | AccentColorsType | EmotionColorsType',
        },
      },
    },
    fit: {
      control: 'select',
      description: 'How the media content should be resized to fit its container.',
      options: [ObjectFit.CONTAIN, ObjectFit.COVER, undefined],
      table: {
        defaultValue: { summary: ObjectFit.COVER },
      },
    },
    hasFilledHeight: {
      control: 'boolean',
      description: 'Fill the height of the media. Only works when the card direction is not vertical.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isExpanded: {
      control: 'boolean',
      description: 'Expand the media to fill the card. Only works when isBoxed is true.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      description: 'Size of the media.',
      options: [...Object.values(CardSizes)],
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
  },
  args: {
    backgroundColor: undefined,
    fit: ObjectFit.COVER,
    hasFilledHeight: false,
    isExpanded: false,
    size: CardSizes.AUTO,
  },
};

export default meta;
type Story = StoryObj<typeof CardMedia>;

export const CardMediaPlayground: Story = {
  name: 'CardMedia',
  render: (args) => (
    <Container>
      <Card isBoxed marginBottom="space-1200">
        <CardMedia {...args}>{MEDIA_IMAGE}</CardMedia>
        <CardLogo>
          <PartnerLogo size="medium" hasSafeArea>
            {LOGO}
          </PartnerLogo>
        </CardLogo>
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
      <Card direction="horizontal" isBoxed>
        <CardMedia {...args}>{MEDIA_IMAGE}</CardMedia>
        <CardLogo>
          <PartnerLogo size="small" hasSafeArea>
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
