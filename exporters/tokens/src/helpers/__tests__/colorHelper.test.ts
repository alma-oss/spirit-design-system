import { exampleCollectionTokens, expectedCollectionValue } from '../../../tests/fixtures/exampleCollectionTokens';
import { examplePrefixToken } from '../../../tests/fixtures/examplePrefixToken';
import {
  canHexBeShortened,
  filterColorCollections,
  findAllHexColorsInStringAndNormalize,
  normalizeColor,
  removeAlphaChannel,
  shortenHex,
  transformColorsToVariables,
} from '../colorHelper';
import { findTokenPrefix } from '../findTokenPrefix';

const dataProviderItems = [
  ['ffffffff', '#fff'],
  ['123456', '#123456'],
  ['123', '#123'],
  ['fff', '#fff'],
  ['ffffff', '#fff'],
  ['ffffff00', '#fff0'],
  ['fffffff0', '#fffffff0'],
  ['96969', '#96969'],
  ['835ea1', '#835ea1'],
  ['00000040', '#00000040'],
];

const dataProviderItemsTransformColorsToVariables = [
  {
    hasTokenPrefix: true,
    group: 'shadows',
    name: 'shadow-100',
    value: '0px 1px 0px #ffffff, 0px 1px 0px #00000001',
    expectedValue:
      '0px 1px 0px var(--spirit-color-shadows-shadow-100-color-01, #ffffff), 0px 1px 0px var(--spirit-color-shadows-shadow-100-color-02, #00000001)',
  },
  {
    hasTokenPrefix: true,
    group: '',
    name: 'shadow-200',
    value: '0px 1px 0px #ffffff, 0px 1px 0px #00000001, 0px 1px 0px #00000002',
    expectedValue:
      '0px 1px 0px var(--spirit-color-shadow-200-color-01, #ffffff), 0px 1px 0px var(--spirit-color-shadow-200-color-02, #00000001), 0px 1px 0px var(--spirit-color-shadow-200-color-03, #00000002)',
  },
  {
    hasTokenPrefix: false,
    group: '',
    name: 'shadow-200',
    value: '0px 1px 0px #ffffff, 0px 1px 0px #00000001, 0px 1px 0px #00000002',
    expectedValue:
      '0px 1px 0px var(--color-shadow-200-color-01, #ffffff), 0px 1px 0px var(--color-shadow-200-color-02, #00000001), 0px 1px 0px var(--color-shadow-200-color-03, #00000002)',
  },
  {
    hasTokenPrefix: true,
    group: '',
    name: 'shadow-300',
    value: '0px 100px 80px 0px #0000001a',
    expectedValue: '0px 100px 80px 0px var(--spirit-color-shadow-300-color-01, #0000001a)',
  },
];

describe('colorHelper', () => {
  describe.each(dataProviderItems)('normalizeColor', (originalColor, expectedColor) => {
    it('should normalize color', () => {
      expect(normalizeColor(originalColor)).toBe(expectedColor);
    });
  });

  describe('canHexBeShortened', () => {
    it('should return true if hex can be shortened', () => {
      expect(canHexBeShortened('ffffff')).toBe(true);
    });

    it('should return false if hex cannot be shortened', () => {
      expect(canHexBeShortened('00000040')).toBe(false);
    });
  });

  describe('shortHex', () => {
    it('should shorten hex', () => {
      expect(shortenHex('ffffff')).toBe('fff');
    });
  });

  describe('removeAlphaChannel', () => {
    it('should not remove alpha channel', () => {
      expect(removeAlphaChannel('ffffff40')).toBe('ffffff40');
    });

    it('should remove alpha channel in short form', () => {
      expect(removeAlphaChannel('fff')).toBe('fff');
    });
  });

  describe('findAllHexColorsInStringAndNormalize', () => {
    it('should find and normalize colors', () => {
      expect(findAllHexColorsInStringAndNormalize('color: #ffffff;')).toBe('color: #fff;');
      expect(findAllHexColorsInStringAndNormalize('color: #000000ff;')).toBe('color: #000;');
      expect(findAllHexColorsInStringAndNormalize('color: #ffffff00;')).toBe('color: #fff0;');
      expect(findAllHexColorsInStringAndNormalize('color: #00000040;')).toBe('color: #00000040;');
      expect(findAllHexColorsInStringAndNormalize('color1: #00000040; color2: #ffffff')).toBe(
        'color1: #00000040; color2: #fff',
      );
    });
  });

  describe.each(dataProviderItemsTransformColorsToVariables)(
    'transformColorsToVariables',
    ({ hasTokenPrefix, group, name, value, expectedValue }) => {
      it('should transform colors to variables', () => {
        const prefixTokens = Array.from(examplePrefixToken.values());
        const tokenPrefix = hasTokenPrefix ? findTokenPrefix(prefixTokens) : '';

        expect(transformColorsToVariables(name, value, tokenPrefix, group)).toBe(expectedValue);
      });
    },
  );

  describe('filterColorCollections', () => {
    it('should filter color collections', () => {
      const tokens = Array.from(exampleCollectionTokens.values());

      expect(filterColorCollections(tokens)).toStrictEqual(expectedCollectionValue);
    });
  });
});
