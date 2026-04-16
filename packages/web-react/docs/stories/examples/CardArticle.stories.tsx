import React from 'react';
import {
  Card,
  CardBody,
  CardEyebrow,
  CardLink,
  CardMedia,
  CardTitle,
  Container,
  Grid,
  Stack,
  Truncate,
} from '../../../src/components';
import { CardSizes } from '../../../src/types';
import { type GridColumns } from '../../../src/types';

type CardArticleCompositionProps = {
  contentText: string;
  eyebrowText: string;
  gridCols: GridColumns;
  mediaSize: (typeof CardSizes)[keyof typeof CardSizes];
  numCards: number;
  readMoreText: string;
  titleText: string;
  wrapInContainer: boolean;
};

export default {
  title: 'Examples/Compositions',
  argTypes: {
    contentText: {
      control: 'text',
      description: 'Article excerpt text.',
      name: 'excerpt',
    },
    eyebrowText: {
      control: 'text',
      description: 'Text for the CardEyebrow component.',
      name: 'eyebrow',
    },
    gridCols: {
      control: 'select',
      name: 'grid columns',
      description: 'Number of columns in the grid.',
      options: [1, 2, 3, 4],
    },
    mediaSize: {
      control: 'select',
      description: 'Size of the card media.',
      name: 'media size',
      options: [...Object.values(CardSizes)],
      table: {
        defaultValue: { summary: CardSizes.MEDIUM },
      },
    },
    numCards: {
      control: 'select',
      name: 'number of cards',
      description: 'Number of article cards to display.',
      options: [1, 2, 3, 4, 5, 6],
    },
    readMoreText: {
      control: 'text',
      description: 'Label for the "Read more" visual cue.',
      name: 'read more label',
    },
    titleText: {
      control: 'text',
      description: 'Text for the CardTitle component.',
      name: 'title',
    },
    wrapInContainer: {
      control: 'boolean',
      description: 'Wrap cards in a Container.',
      name: 'wrap in container',
    },
  },
  args: {
    contentText:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. dolor sit amet',
    eyebrowText: 'Eyebrow',
    gridCols: 2,
    mediaSize: CardSizes.MEDIUM,
    numCards: 2,
    readMoreText: 'Read more',
    titleText: 'Article Title',
    wrapInContainer: true,
  },
};

export const CardArticle = (args: CardArticleCompositionProps) => {
  const { contentText, eyebrowText, gridCols, mediaSize, numCards, readMoreText, titleText, wrapInContainer } = args;

  const renderCards = () => (
    <Grid cols={{ mobile: 1, tablet: gridCols }}>
      {Array.from({ length: numCards }, (_, index) => (
        <Card key={index} direction="horizontal" alignmentY="center">
          <CardMedia size={mediaSize} isExpanded>
            <img src="https://picsum.photos/id/200/180/180" alt="" />
          </CardMedia>
          <CardBody>
            <Stack spacing="space-400">
              <CardEyebrow>{eyebrowText}</CardEyebrow>
              <CardTitle>
                <CardLink href="/article-123">{titleText}</CardLink>
              </CardTitle>
              <Truncate limit={3}>{contentText}</Truncate>
              <div className="link-primary">{readMoreText}</div>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );

  return wrapInContainer ? <Container>{renderCards()}</Container> : renderCards();
};
