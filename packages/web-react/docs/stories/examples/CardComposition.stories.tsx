import React, { type ElementType } from 'react';
import {
  ButtonLink,
  Card,
  CardArtwork,
  CardBody,
  CardEyebrow,
  CardFooter,
  CardLink,
  CardLogo,
  CardMedia,
  CardTitle,
  Container,
  Grid,
  Icon,
  PartnerLogo,
  type UseCardStyleProps,
} from '../../../src/components';
import { LOGO, MEDIA_IMAGE } from '../../../src/components/Card/demo/constants';
import { AlignmentX, DirectionExtended, Sizes } from '../../../src/constants';
import { CardSizes, type GridColumns, type SizesDictionaryType } from '../../../src/types';

type CardCompositionType = {
  cardElementType: ElementType;
  cardLogoHasSafeArea: boolean;
  cardLogoSize: SizesDictionaryType;
  contentText: string;
  eyebrowText: string;
  gridCols: GridColumns;
  image: string;
  numCards: number;
  showArtwork: boolean;
  showContent: boolean;
  showEyebrow: boolean;
  showFooter: boolean;
  showLogo: boolean;
  showMedia: boolean;
  showTitle: boolean;
  titleElementType: ElementType;
  titleText: string;
  titleWithLink: boolean;
  wrapInContainer: boolean;
} & UseCardStyleProps;

export default {
  title: 'Examples/Compositions/Card',
  argTypes: {
    artworkAlignmentX: {
      control: 'select',
      description: 'Alignment inside CardArtwork component.',
      options: [...Object.values(AlignmentX)],
      name: 'alignmentX',
      table: {
        category: 'CardArtwork',
        defaultValue: { summary: AlignmentX.LEFT },
      },
    },
    cardElementType: {
      control: 'text',
      name: 'elementType',
      description: 'Element type for the card.',
      table: {
        category: 'Card',
        defaultValue: { summary: 'article' },
      },
    },
    cardLogoHasSafeArea: {
      control: 'boolean',
      description: 'If true, the logo will have a safe area.',
      name: 'logo safe area',
      table: {
        category: 'CardLogo',
        subcategory: 'Demo settings',
      },
    },
    cardLogoSize: {
      control: 'select',
      description: 'Size of the logo.',
      options: [...Object.values(Sizes)],
      name: 'logo size',
      table: {
        category: 'CardLogo',
        subcategory: 'Demo settings',
      },
    },
    contentText: {
      control: 'text',
      description: 'Text for the user content.',
      name: 'children',
      table: {
        category: 'CardBody',
        defaultValue: {
          summary: '',
        },
      },
    },
    direction: {
      control: 'select',
      description: 'Direction of the card.',
      options: [...Object.values(DirectionExtended)],
      table: {
        category: 'Card',
        defaultValue: { summary: DirectionExtended.VERTICAL },
      },
    },
    eyebrowText: {
      control: 'text',
      description: 'Text for the CardEyebrow component.',
      name: 'children',
      table: {
        category: 'CardEyebrow',
        defaultValue: { summary: '' },
      },
    },
    footerAlignmentX: {
      control: 'select',
      description: 'Alignment inside CardFooter component.',
      options: [...Object.values(AlignmentX)],
      name: 'alignmentX',
      table: {
        category: 'CardFooter',
        defaultValue: { summary: AlignmentX.LEFT },
      },
    },
    gridCols: {
      control: 'select',
      name: 'grid columns',
      description: 'Number of columns in the grid.',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    hasFilledHeight: {
      control: 'boolean',
      description: 'Fill the height of the media.',
      table: {
        category: 'CardMedia',
        defaultValue: { summary: false },
      },
    },
    image: {
      control: 'text',
      description: 'Image source for the CardMedia image.',
      name: 'image url',
      table: {
        category: 'CardMedia',
        subcategory: 'Demo settings',
      },
    },
    isBoxed: {
      control: 'boolean',
      description: 'Border around the card.',
      table: {
        category: 'Card',
        defaultValue: { summary: false },
      },
    },
    isExpanded: {
      control: 'boolean',
      description: 'Expand the media to fill the card. Only works when isBoxed is true.',
      table: {
        category: 'CardMedia',
        defaultValue: { summary: false },
      },
    },
    isHeading: {
      control: 'boolean',
      description: 'If true, the CardTitle will render as a heading.',
      table: {
        category: 'CardTitle',
        defaultValue: { summary: true },
      },
    },
    isSelectable: {
      control: 'boolean',
      description: 'Whether the CardBody is selectable.',
      table: {
        category: 'CardBody',
        defaultValue: { summary: false },
      },
    },
    numCards: {
      control: 'select',
      name: 'number of cards',
      description: 'Number of cards to display.',
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    showArtwork: {
      control: 'boolean',
      description: 'Show the CardArtwork component.',
      name: 'show artwork',
      table: {
        category: 'CardArtwork',
        subcategory: 'Demo settings',
      },
    },
    showFooter: {
      control: 'boolean',
      description: 'Show the CardFooter component.',
      name: 'show footer',
      table: {
        category: 'CardFooter',
        subcategory: 'Demo settings',
      },
    },
    showLogo: {
      control: 'boolean',
      description: 'Show the CardLogo component.',
      name: 'show logo',
      table: {
        category: 'CardLogo',
        subcategory: 'Demo settings',
      },
    },
    showContent: {
      control: 'boolean',
      description: 'Show the user content component.',
      name: 'show card content',
      table: {
        category: 'CardBody',
        subcategory: 'Demo settings',
      },
    },
    showEyebrow: {
      control: 'boolean',
      description: 'Show the CardEyebrow component.',
      name: 'show eyebrow',
      table: {
        category: 'CardEyebrow',
        subcategory: 'Demo settings',
      },
    },
    showMedia: {
      control: 'boolean',
      description: 'Show the CardMedia component.',
      name: 'show media',
      table: {
        category: 'CardMedia',
        subcategory: 'Demo settings',
      },
    },
    showTitle: {
      control: 'boolean',
      description: 'Show the CardTitle component.',
      name: 'show title',
      table: {
        category: 'CardTitle',
        subcategory: 'Demo settings',
      },
    },
    size: {
      control: 'select',
      description: 'Size of the media.',
      options: [...Object.values(CardSizes)],
      table: {
        category: 'CardMedia',
        defaultValue: { summary: CardSizes.MEDIUM },
      },
    },
    titleElementType: {
      control: 'text',
      name: 'elementType',
      description: 'Element type for the title.',
      table: {
        category: 'CardTitle',
        defaultValue: { summary: 'h4' },
      },
    },
    titleText: {
      control: 'text',
      description: 'Text for the CardTitle component.',
      name: 'children',
      table: {
        category: 'CardTitle',
        defaultValue: { summary: '' },
      },
    },
    titleWithLink: {
      control: 'boolean',
      description: 'Add a link to the CardTitle component.',
      name: 'title as link',
      table: {
        category: 'CardTitle',
        subcategory: 'Demo settings',
      },
    },
    wrapInContainer: {
      control: 'boolean',
      description: 'Wrap the card in a container.',
      name: 'wrap cards in container',
    },
  },
  args: {
    artworkAlignmentX: AlignmentX.LEFT,
    cardElementType: 'article',
    cardLogoHasSafeArea: true,
    cardLogoSize: Sizes.MEDIUM,
    contentText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat. Morbi fringilla convallis sapien. Sed ac felis. Aliquam erat volutpat. Aliquam euismod. Aenean vel lectus. Nunc imperdiet justo nec dolor.',
    direction: DirectionExtended.VERTICAL,
    eyebrowText: 'Eyebrow title',
    footerAlignmentX: AlignmentX.LEFT,
    gridCols: 3,
    hasFilledHeight: false,
    image: MEDIA_IMAGE,
    isBoxed: false,
    isExpanded: false,
    isHeading: true,
    isSelectable: false,
    numCards: 3,
    showArtwork: false,
    showFooter: true,
    showLogo: true,
    showContent: true,
    showEyebrow: true,
    showMedia: true,
    showTitle: true,
    size: CardSizes.MEDIUM,
    titleElementType: 'h4',
    titleText: 'Card Title',
    titleWithLink: false,
    wrapInContainer: true,
  },
};

export const CardComposition = (args: CardCompositionType) => {
  const {
    artworkAlignmentX,
    cardElementType,
    cardLogoHasSafeArea,
    cardLogoSize,
    contentText,
    direction,
    eyebrowText,
    footerAlignmentX,
    gridCols,
    hasFilledHeight,
    image,
    isBoxed,
    isExpanded,
    isHeading,
    isSelectable,
    numCards,
    showArtwork,
    showContent,
    showEyebrow,
    showFooter,
    showLogo,
    showMedia,
    showTitle,
    size,
    titleElementType,
    titleText,
    titleWithLink,
    wrapInContainer,
    ...restProps
  } = args;

  const renderTitle = () => (
    <CardTitle isHeading={isHeading} elementType={titleElementType}>
      {titleWithLink ? <CardLink href="#">{titleText}</CardLink> : titleText}
    </CardTitle>
  );

  const renderCard = () => (
    <Grid cols={gridCols}>
      {Array.from({ length: numCards }, (_, index) => (
        <Card key={index} elementType={cardElementType} {...restProps} isBoxed={isBoxed} direction={direction}>
          {showMedia && (
            <CardMedia isExpanded={isExpanded} size={size} hasFilledHeight={hasFilledHeight}>
              {image}
            </CardMedia>
          )}
          {showArtwork && (
            <CardArtwork alignmentX={artworkAlignmentX}>
              <Icon name="file" />
            </CardArtwork>
          )}
          {showLogo && (
            <CardLogo>
              <PartnerLogo size={cardLogoSize} hasSafeArea={cardLogoHasSafeArea}>
                {LOGO}
              </PartnerLogo>
            </CardLogo>
          )}
          {(showEyebrow || showTitle || showContent) && (
            <CardBody isSelectable={isSelectable}>
              {showEyebrow && <CardEyebrow>{eyebrowText}</CardEyebrow>}
              {showTitle && renderTitle()}
              {showContent && <p>{contentText}</p>}
            </CardBody>
          )}
          {showFooter && (
            <CardFooter alignmentX={footerAlignmentX}>
              <ButtonLink color="primary">Primary</ButtonLink>
              <ButtonLink color="secondary">Secondary</ButtonLink>
            </CardFooter>
          )}
        </Card>
      ))}
    </Grid>
  );

  return wrapInContainer ? <Container>{renderCard()}</Container> : renderCard();
};
