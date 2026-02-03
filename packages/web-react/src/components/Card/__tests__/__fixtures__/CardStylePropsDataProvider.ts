import { AlignmentX, AlignmentY, DirectionExtended } from '../../../../constants';
import { type AlignmentXDictionaryType, type AlignmentYDictionaryType, CardSizes } from '../../../../types';
import { toPascalCase } from '../../../../utils';
import { type UseCardStyleProps, type UseCardStylePropsReturn } from '../../useCardStyleProps';

type TextPropsDataProviderType = {
  props: UseCardStyleProps;
  description: string;
  expected: UseCardStylePropsReturn;
};

export const defaultExpectedClasses = {
  artwork: 'CardArtwork',
  body: 'CardBody',
  eyebrow: 'CardEyebrow',
  footer: 'CardFooter',
  link: 'CardLink',
  logo: 'CardLogo',
  media: 'CardMedia',
  mediaCanvas: 'CardMedia__canvas',
  root: 'Card',
  title: 'CardTitle',
};

const generateExpectedClassProps = (overrides: Partial<typeof defaultExpectedClasses>) => ({
  ...defaultExpectedClasses,
  ...overrides,
});

const alignmentDataProvider = (type: 'artwork' | 'footer', values: { alignment: AlignmentXDictionaryType }[]) =>
  values.map(({ alignment }) => ({
    props: { [`${type}AlignmentX`]: alignment },
    description: `return correct classProps for ${type}AlignmentX ${alignment!.toLowerCase()}`,
    expected: {
      classProps: generateExpectedClassProps({
        [type]: `${defaultExpectedClasses[type]} ${defaultExpectedClasses[type]}--alignmentX${toPascalCase(alignment!)}`,
      }),
    },
  }));

const alignmentYDataProvider = (values: { alignment: AlignmentYDictionaryType }[]) =>
  values.map(({ alignment }) => ({
    props: { alignmentY: alignment },
    description: `return correct classProps for alignmentY ${alignment!.toLowerCase()}`,
    expected: {
      classProps: generateExpectedClassProps({
        root: `Card Card--alignmentY${toPascalCase(alignment!)}`,
      }),
    },
  }));

const sizeDataProvider = Object.values(CardSizes).map((size) => ({
  props: { size },
  description: `return correct classProps for media ${size.toLowerCase()}`,
  expected: {
    classProps: generateExpectedClassProps({
      media: `${defaultExpectedClasses.media} ${defaultExpectedClasses.media}--${size.toLowerCase()}`,
    }),
  },
}));

export const textPropsDataProvider: TextPropsDataProviderType[] = [
  {
    props: { direction: DirectionExtended.VERTICAL },
    description: 'return correct classProps for direction vertical',
    expected: { classProps: generateExpectedClassProps({ root: 'Card Card--vertical' }) },
  },
  {
    props: { direction: DirectionExtended.HORIZONTAL },
    description: 'return correct classProps for direction horizontal',
    expected: { classProps: generateExpectedClassProps({ root: 'Card Card--horizontal' }) },
  },
  {
    props: { direction: DirectionExtended.HORIZONTAL_REVERSED },
    description: 'return correct classProps for direction horizontal reversed',
    expected: { classProps: generateExpectedClassProps({ root: 'Card Card--horizontalReversed' }) },
  },

  ...alignmentDataProvider('artwork', [
    { alignment: AlignmentX.LEFT },
    { alignment: AlignmentX.RIGHT },
    { alignment: AlignmentX.CENTER },
  ]),

  ...alignmentDataProvider('footer', [
    { alignment: AlignmentX.LEFT },
    { alignment: AlignmentX.RIGHT },
    { alignment: AlignmentX.CENTER },
  ]),

  ...alignmentYDataProvider([
    { alignment: AlignmentY.TOP },
    { alignment: AlignmentY.CENTER },
    { alignment: AlignmentY.BOTTOM },
  ]),

  {
    props: { isBoxed: true },
    description: 'return correct classProps for boxed card',
    expected: { classProps: generateExpectedClassProps({ root: 'Card Card--boxed' }) },
  },

  {
    props: { isSelectable: true },
    description: 'return correct classProps for body selectable',
    expected: {
      classProps: generateExpectedClassProps({
        body: `${defaultExpectedClasses.body} ${defaultExpectedClasses.body}--selectable`,
      }),
    },
  },

  {
    props: { hasFilledHeight: true },
    description: 'return correct classProps for media with filled height',
    expected: {
      classProps: generateExpectedClassProps({
        media: `${defaultExpectedClasses.media} ${defaultExpectedClasses.media}--filledHeight`,
      }),
    },
  },
  {
    props: { isExpanded: true },
    description: 'return correct classProps for media expanded',
    expected: {
      classProps: generateExpectedClassProps({
        media: `${defaultExpectedClasses.media} ${defaultExpectedClasses.media}--expanded`,
      }),
    },
  },
  ...sizeDataProvider,

  {
    props: { isHeading: true },
    description: 'return correct classProps for title heading',
    expected: {
      classProps: generateExpectedClassProps({
        title: `${defaultExpectedClasses.title} ${defaultExpectedClasses.title}--heading`,
      }),
    },
  },

  {
    props: {
      alignmentY: AlignmentY.CENTER,
      artworkAlignmentX: AlignmentX.LEFT,
      direction: DirectionExtended.HORIZONTAL,
      footerAlignmentX: AlignmentX.RIGHT,
      hasFilledHeight: true,
      isBoxed: true,
      isExpanded: true,
      isHeading: false,
      isSelectable: true,
      size: CardSizes.SMALL,
    },
    description:
      'return correct classProps for a horizontal, boxed, expanded card with small size and center alignment',
    expected: {
      classProps: generateExpectedClassProps({
        artwork: 'CardArtwork CardArtwork--alignmentXLeft',
        body: 'CardBody CardBody--selectable',
        footer: 'CardFooter CardFooter--alignmentXRight',
        media: 'CardMedia CardMedia--small CardMedia--expanded CardMedia--filledHeight',
        root: 'Card Card--alignmentYCenter Card--horizontal Card--boxed',
      }),
    },
  },
];
