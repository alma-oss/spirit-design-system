import { TypographyToken } from '@supernovaio/sdk-exporters';
import { mapToken } from '../../adapters/supernova/mappers/tokenMapper';
import type { TokenValue } from '../../core/types';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { exampleTypographyTokens, expectedTypographyValue } from '../../../tests/fixtures/exampleTypographyTokens';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import { typographyValue } from '../typographyHelper';

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
  describe('typographyValue', () => {
    it('should return the expected typography value', () => {
      const mockedToken: TypographyToken = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const tokenValue = typographyValue(mapToken(mockedToken, exampleGroups)!.value, true, false);

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
      const tokenValue = typographyValue(
        typographyModel({ fontSize: pixels(fontSize), lineHeight: pixels(lineHeight), fontWeight: 'Regular' }),
        false,
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
      const tokenValue = typographyValue(typographyModel({ fontSize: pixels(16), fontWeight }), false, false);

      expect(tokenValue).toContain(`font-weight: ${expectedFontWeight}`);
    });
  });
});
