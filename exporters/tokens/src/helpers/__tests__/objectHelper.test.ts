import { Token, TokenType } from '@supernovaio/sdk-exporters';
import { deepMergeObjects, passObjectKeyValueToCallback, getTokenAlias, normalizeFirstNamePart } from '../objectHelper';
import { exampleTypographyTokens } from '../../../tests/fixtures/exampleTypographyTokens';

const mergedObject = {
  $grids: {
    spacing: {
      desktop: '$grid-spacing-desktop',
      mobile: '$grid-spacing-mobile',
      tablet: '$grid-spacing-tablet',
    },
    columns: '$grid-columns',
  },
};

const mergedTypographyObject = {
  $heading1: {
    'font-family': '$font-family-example',
    'font-size': '$font-size-example',
  },
  $body1: {
    'font-family': '$font-family-example',
    'font-size': '$font-size-example',
  },
  $styles: {
    'heading-1': '$heading-1-example',
    'body-1': '$body-1-example',
  },
};

describe('objectHelper', () => {
  describe('deepMergeObjects', () => {
    const object1 = {
      $grids: {
        spacing: {
          desktop: '$grid-spacing-desktop',
          mobile: '$grid-spacing-mobile',
          tablet: '$grid-spacing-tablet',
        },
      },
    };

    const object2 = {
      $grids: { columns: '$grid-columns' },
    };

    it('should merge objects', () => {
      const result = deepMergeObjects(object1, object2);

      expect(result).toStrictEqual(mergedObject);
    });

    it('should merge typography objects', () => {
      const typographyObject1 = {
        $heading1: {
          'font-family': '$font-family-example',
          'font-size': '$font-size-example',
        },
        $styles: {
          'heading-1': '$heading-1-example',
          moveToTheEnd: 'true',
        },
      };

      const typographyObject2 = {
        $body1: {
          'font-family': '$font-family-example',
          'font-size': '$font-size-example',
        },
        $styles: {
          'body-1': '$body-1-example',
        },
      };

      const result = deepMergeObjects(typographyObject1, typographyObject2);

      expect(result).toStrictEqual(mergedTypographyObject);
    });
  });

  describe('getTokenAlias', () => {
    it('should return token alias for non-numeric', () => {
      const token = exampleTypographyTokens.get('typographyRef2') as Token;

      expect(getTokenAlias(token, false)).toBe('bold-link');
    });

    it('should return token alias for non-numeric with js output', () => {
      const token = exampleTypographyTokens.get('typographyRef2') as Token;

      expect(getTokenAlias(token, true)).toBe('boldLink');
    });
  });

  describe('normalizeFirstNamePart', () => {
    it('should return correct first part name for token type dimension', () => {
      expect(normalizeFirstNamePart('grid', TokenType.dimension, false)).toBe('$grids');
    });

    it('should return correct first part name for token type color', () => {
      expect(normalizeFirstNamePart('action', TokenType.color, false)).toBe('$action-colors');
    });
  });

  describe('passObjectKeyValueToCallback', () => {
    it('should map defined entries and skip undefined ones', () => {
      expect(passObjectKeyValueToCallback({ a: 1, b: undefined, c: 'x' }, (key, value) => `${key}=${value}`)).toEqual([
        'a=1',
        'c=x',
      ]);
    });
  });
});
