import { TypographyToken } from '@supernovaio/sdk-exporters';
import { mapToken } from '../../adapters/supernova/mappers/tokenMapper';
import type { TokenValue } from '../../core/types';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { exampleTypographyTokens, expectedTypographyValue } from '../../../tests/fixtures/exampleTypographyTokens';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import { formatTypographyStyle } from '../../formatters/typographyFormatter';
import { formatTypographyName, getBreakpoint, typographyStyle } from '../typographyHelper';

jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

const pixels = (value: number): TokenValue => ({ type: 'number', value, unit: 'px' });

const typographyModel = ({
  fontSize,
  lineHeight,
  fontWeight,
}: {
  fontSize?: TokenValue;
  lineHeight?: TokenValue;
  fontWeight: string;
}): TokenValue => ({
  type: 'composite',
  value: {
    fontFamily: { type: 'string', value: 'Inter' },
    fontWeight: { type: 'string', value: fontWeight },
    ...(fontSize && { fontSize }),
    ...(lineHeight && { lineHeight }),
  },
});

describe('typographyHelper', () => {
  describe('typographyStyle', () => {
    it('should return the expected typography value', () => {
      const mockedToken: TypographyToken = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const tokenValue = formatTypographyStyle(
        typographyStyle(mapToken(mockedToken, exampleGroups)!.value, true),
        false,
      );

      expect(tokenValue).toBe(expectedTypographyValue);
    });

    it.each([
      {
        fontSize: 10,
        lineHeight: 14,
        expectedLineHeight: '1.4',
      },
      {
        fontSize: 10_000,
        lineHeight: 14_454,
        expectedLineHeight: '1.4454',
      },
      {
        fontSize: 14,
        lineHeight: 20,
        expectedLineHeight: '1.4286',
      },
      {
        fontSize: 12,
        lineHeight: 12,
        expectedLineHeight: '1',
      },
    ])('should format line-height as $expectedLineHeight', ({ fontSize, lineHeight, expectedLineHeight }) => {
      const tokenValue = formatTypographyStyle(
        typographyStyle(
          typographyModel({ fontSize: pixels(fontSize), lineHeight: pixels(lineHeight), fontWeight: 'Regular' }),
          false,
        ),
        false,
      );

      expect(tokenValue).toContain(`line-height: ${expectedLineHeight}`);
    });

    it.each([
      { fontWeight: 'SemiBold', expectedFontWeight: 600 },
      { fontWeight: 'Semi Bold', expectedFontWeight: 600 },
      { fontWeight: 'Semi-Bold', expectedFontWeight: 600 },
      { fontWeight: 'Semi Bold Italic', expectedFontWeight: 600 },
      { fontWeight: 'Extra Light', expectedFontWeight: 200 },
      { fontWeight: '500', expectedFontWeight: 500 },
    ])('should format font-weight "$fontWeight" as $expectedFontWeight', ({ fontWeight, expectedFontWeight }) => {
      const tokenValue = formatTypographyStyle(
        typographyStyle(typographyModel({ fontSize: pixels(16), fontWeight }), false),
        false,
      );

      expect(tokenValue).toContain(`font-weight: ${expectedFontWeight}`);
    });
  });

  describe('getBreakpoint', () => {
    it('should return correct breakpoint if tokenNameParts has 4 items', () => {
      expect(getBreakpoint(['heading', 'desktop', 'xLarge', 'bold'])).toBe('desktop');
    });

    it('should return correct breakpoint if tokenNameParts has less than 4 items', () => {
      expect(getBreakpoint(['Heading', 'Desktop', 'XLarge'])).toBe('mobile');
    });
  });

  describe('formatTypographyName', () => {
    it('should return correct typography name', () => {
      const tokenNameParts = ['heading', 'desktop', 'xLarge', 'bold'];

      expect(formatTypographyName(tokenNameParts)).toBe('heading-xLarge-bold');
    });

    it('should return correct typography name if tokenNameParts has less than 4 items', () => {
      const tokenNameParts = ['heading', 'desktop', 'xLarge'];

      expect(formatTypographyName(tokenNameParts)).toBe('heading-desktop-xLarge');
    });
  });
});
