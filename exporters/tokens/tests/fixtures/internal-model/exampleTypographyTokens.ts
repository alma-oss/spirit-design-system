import { CollectionKind, type DesignToken, TokenTypeEnum } from '../../../src/core/types';

export const exampleTypographyTokens = new Map<string, DesignToken>([
  [
    'typographyRef1',
    {
      id: 'typographyRef1',
      name: 'Bold',
      type: TokenTypeEnum.Typography,
      value: {
        type: 'composite',
        value: {
          fontFamily: { type: 'string', value: 'Inter' },
          fontWeight: { type: 'string', value: 'Bold' },
          fontSize: { type: 'reference', tokenId: 'font-size-id', resolved: { type: 'number', value: 40, unit: 'px' } },
          lineHeight: {
            type: 'reference',
            tokenId: 'line-height-id',
            resolved: { type: 'number', value: 52, unit: 'px' },
          },
        },
      },
      metadata: {
        groupPath: ['Heading'],
        groupId: '6',
        originName: 'Heading/XLarge/Bold',
        namePath: ['Heading'],
        collection: CollectionKind.Global,
      },
      source: { adapter: 'test', originalId: 'typographyRef1', originalType: 'Typography' },
    },
  ],
  [
    'typographyRef2',
    {
      id: 'typographyRef2',
      name: 'Bold-Link',
      type: TokenTypeEnum.Typography,
      value: {
        type: 'composite',
        value: {
          fontFamily: { type: 'string', value: 'Inter' },
          fontWeight: { type: 'string', value: 'Bold' },
          fontSize: { type: 'reference', tokenId: 'font-size-id', resolved: { type: 'number', value: 40, unit: 'px' } },
          lineHeight: {
            type: 'reference',
            tokenId: 'line-height-id',
            resolved: { type: 'number', value: 52, unit: 'px' },
          },
        },
      },
      metadata: {
        groupPath: ['Heading'],
        groupId: '7',
        originName: 'Heading/XLarge/Bold-Link',
        namePath: ['Heading'],
        collection: CollectionKind.Global,
      },
      source: { adapter: 'test', originalId: 'typographyRef2', originalType: 'Typography' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const expectedTypographyValue = `(
font-family: "'Inter', sans-serif",
font-size: 2.5rem,
font-style: italic,
font-weight: 700,
line-height: 1.3,
)`;

export const expectedTypographyWithFontReplacement = `(
font-family: "'Replaced-font', replaced-substitute-font",
font-size: 2.5rem,
font-style: italic,
font-weight: 700,
line-height: 1.3,
)`;
