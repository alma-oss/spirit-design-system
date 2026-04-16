import figma from '@figma/code-connect';
import React from 'react';
import { Link } from '../../Link';
import { Stack } from '../../Stack';
import { Truncate } from '../../Truncate';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardLink from '../CardLink';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';

const CARD_ARTICLE_NODE_URL = '<FIGMA_FILE_ID>?node-id=39728%3A2472';

const commonProps = {
  cardMediaSize: figma.enum('Size', {
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  }),
};

const eyebrowProps = {
  eyebrow: figma.boolean('Eyebrow', {
    true: <CardEyebrow>Eyebrow</CardEyebrow>,
    false: undefined,
  }),
};

const paragraphProps = {
  paragraph: figma.boolean('Paragraph text', {
    true: (
      <Truncate limit={2}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor.
      </Truncate>
    ),
    false: undefined,
  }),
};

figma.connect(Card, CARD_ARTICLE_NODE_URL, {
  props: {
    ...commonProps,
    ...paragraphProps,
  },
  variant: {
    Variant: '01',
  },
  example: ({ cardMediaSize, paragraph, ...props }) => (
    <Card direction="horizontal" alignmentY="center" {...props}>
      <CardMedia size={cardMediaSize} isExpanded>
        <img src="https://picsum.photos/id/200/180/180" alt="" />
      </CardMedia>
      <CardBody>
        <Stack spacing="space-400">
          <CardTitle>Article Title</CardTitle>
          {paragraph}
          <Link href="/article-123">Read more</Link>
        </Stack>
      </CardBody>
    </Card>
  ),
});

figma.connect(Card, CARD_ARTICLE_NODE_URL, {
  props: {
    ...commonProps,
    ...eyebrowProps,
    ...paragraphProps,
  },
  variant: {
    Variant: '02',
  },
  example: ({ cardMediaSize, eyebrow, paragraph, ...props }) => (
    <Card direction="horizontal" alignmentY="center" {...props}>
      <CardMedia size={cardMediaSize} isExpanded>
        <img src="https://picsum.photos/id/200/180/180" alt="" />
      </CardMedia>
      <CardBody>
        <Stack spacing="space-400">
          {eyebrow}
          <CardTitle>
            <CardLink href="#">Article Title</CardLink>
          </CardTitle>
          {paragraph}
        </Stack>
      </CardBody>
    </Card>
  ),
});

figma.connect(Card, CARD_ARTICLE_NODE_URL, {
  props: {
    ...commonProps,
    ...eyebrowProps,
  },
  variant: {
    Variant: '03',
  },
  example: ({ cardMediaSize, eyebrow, ...props }) => (
    <Card direction="horizontal" alignmentY="center" {...props}>
      <CardMedia size={cardMediaSize} isExpanded>
        <img src="https://picsum.photos/id/200/180/180" alt="" />
      </CardMedia>
      <CardBody>
        <Stack spacing="space-400">
          {eyebrow}
          <CardTitle>Article Title</CardTitle>
          <Link href="/article-123">Read more</Link>
        </Stack>
      </CardBody>
    </Card>
  ),
});
