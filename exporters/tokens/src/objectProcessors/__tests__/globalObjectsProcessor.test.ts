import type { StylesObjectType } from '../../generators/stylesObjectGenerator';
import {
  addGlobalColorsToStylesObject,
  addGlobalTypographyToStylesObject,
  colorGroupsReducer,
  createGlobalColorsObject,
  createGlobalTypographyObject,
  parseGroupName,
  typographyGroupReducer,
} from '../globalObjectsProcessor';

describe('globalObjectsProcessor', () => {
  describe('parseGroupName', () => {
    it('should parse SCSS color group name', () => {
      expect(parseGroupName('$background-colors', false)).toBe('background');
      expect(parseGroupName('$action-colors', false)).toBe('action');
    });

    it('should parse JS color group name', () => {
      expect(parseGroupName('backgroundColors', true)).toBe('background');
      expect(parseGroupName('actionColors', true)).toBe('action');
    });

    it('should handle name without suffix', () => {
      expect(parseGroupName('background', false)).toBe('background');
      expect(parseGroupName('background', true)).toBe('background');
    });
  });

  describe('colorGroupsReducer', () => {
    it('should reduce color keys', () => {
      const accumulated = { action: '$action-colors' };
      const result = colorGroupsReducer(accumulated, '$background-colors');

      expect(result).toEqual({
        action: '$action-colors',
        background: '$background-colors',
      });
    });

    it('should handle empty accumulator', () => {
      const result = colorGroupsReducer({}, '$action-colors');

      expect(result).toEqual({
        action: '$action-colors',
      });
    });
  });

  describe('typographyGroupReducer', () => {
    it('should reduce typography keys', () => {
      const accumulated = { 'heading-xlarge': '$heading-xlarge-bold' };
      const result = typographyGroupReducer(accumulated, '$heading-xlarge-italic');

      expect(result).toEqual({
        'heading-xlarge': '$heading-xlarge-bold',
        'heading-xlarge-italic': '$heading-xlarge-italic',
      });
    });

    it('should handle empty accumulator', () => {
      const result = typographyGroupReducer({}, '$heading-xlarge-bold');

      expect(result).toEqual({
        'heading-xlarge-bold': '$heading-xlarge-bold',
      });
    });
  });

  describe('createGlobalColorsObject', () => {
    it('should create global colors object for SCSS', () => {
      const colorKeys = ['$action-colors', '$background-colors'];
      const result = createGlobalColorsObject(colorKeys, false);

      expect(result).toEqual({
        action: '$action-colors',
        background: '$background-colors',
      });
    });

    it('should create global colors object for JS', () => {
      const colorKeys = ['actionColors', 'backgroundColors'];
      const result = createGlobalColorsObject(colorKeys, true);

      expect(result).toEqual({
        action: 'actionColors',
        background: 'backgroundColors',
      });
    });

    it('should handle empty array', () => {
      const result = createGlobalColorsObject([], false);

      expect(result).toEqual({});
    });
  });

  describe('createGlobalTypographyObject', () => {
    it('should create global typography object', () => {
      const typographyKeys = ['$heading-xlarge-bold', '$heading-large-bold'];
      const result = createGlobalTypographyObject(typographyKeys);

      expect(result).toEqual({
        'heading-xlarge-bold': '$heading-xlarge-bold',
        'heading-large-bold': '$heading-large-bold',
      });
    });

    it('should handle empty array', () => {
      const result = createGlobalTypographyObject([]);

      expect(result).toEqual({});
    });
  });

  describe('addGlobalColorsToStylesObject', () => {
    it('should add global colors object when color keys exist (SCSS)', () => {
      const stylesObject: StylesObjectType = {
        '$action-colors': { button: { primary: '$action-button-primary' } } as StylesObjectType,
        '$background-colors': { primary: '$background-primary' } as StylesObjectType,
        '$other-token': 'value',
      };

      const result = addGlobalColorsToStylesObject(stylesObject, false);

      expect(result).toHaveProperty('$colors');
      // eslint-disable-next-line dot-notation -- $colors contains special character
      expect(result['$colors']).toEqual({
        action: '$action-colors',
        background: '$background-colors',
      });
      expect(result).toHaveProperty('$other-token');
    });

    it('should add global colors object when color keys exist (JS)', () => {
      const stylesObject: StylesObjectType = {
        actionColors: { button: { primary: 'actionButtonPrimary' } } as StylesObjectType,
        backgroundColors: { primary: 'backgroundPrimary' } as StylesObjectType,
        otherToken: 'value',
      };

      const result = addGlobalColorsToStylesObject(stylesObject, true);

      expect(result).toHaveProperty('colors');
      expect(result.colors).toEqual({
        action: 'actionColors',
        background: 'backgroundColors',
      });
      expect(result).toHaveProperty('otherToken');
    });

    it('should not add global colors object when no color keys exist', () => {
      const stylesObject: StylesObjectType = {
        '$other-token': 'value',
        '$another-token': 'another-value',
      };

      const result = addGlobalColorsToStylesObject(stylesObject, false);

      expect(result).not.toHaveProperty('$colors');
      expect(result).toEqual(stylesObject);
    });

    it('should handle empty styles object', () => {
      const stylesObject: StylesObjectType = {};

      const result = addGlobalColorsToStylesObject(stylesObject, false);

      expect(result).not.toHaveProperty('$colors');
      expect(result).toEqual({});
    });
  });

  describe('addGlobalTypographyToStylesObject', () => {
    it('should add global typography object when typography keys exist (SCSS)', () => {
      const stylesObject: StylesObjectType = {
        '$heading-xlarge-bold': { mobile: 'value' } as StylesObjectType,
        '$body-large': { mobile: 'value' } as StylesObjectType,
        '$other-token': 'value',
      };

      const result = addGlobalTypographyToStylesObject(stylesObject, false);

      expect(result).toHaveProperty('$styles');

      // eslint-disable-next-line dot-notation -- $styles contains special character
      const stylesObj = result['$styles'] as { [key: string]: unknown } & { moveToTheEnd?: string };

      expect(stylesObj).toEqual({
        'heading-xlarge-bold': '$heading-xlarge-bold',
        'body-large': '$body-large',
        moveToTheEnd: 'true',
      });
      expect(result).toHaveProperty('$other-token');
    });

    it('should add global typography object when typography keys exist (JS)', () => {
      const stylesObject: StylesObjectType = {
        headingXlargeBold: { mobile: 'value' } as StylesObjectType,
        bodyLarge: { mobile: 'value' } as StylesObjectType,
        otherToken: 'value',
      };

      const result = addGlobalTypographyToStylesObject(stylesObject, true);

      expect(result).toHaveProperty('styles');

      const stylesObj = result.styles as { [key: string]: unknown } & { moveToTheEnd?: string };

      expect(stylesObj).toEqual({
        headingXlargeBold: 'headingXlargeBold',
        bodyLarge: 'bodyLarge',
        moveToTheEnd: 'true',
      });
      expect(result).toHaveProperty('otherToken');
    });

    it('should not add global typography object when no typography keys exist', () => {
      const stylesObject: StylesObjectType = {
        '$other-token': 'value',
        '$another-token': 'another-value',
      };

      const result = addGlobalTypographyToStylesObject(stylesObject, false);

      expect(result).not.toHaveProperty('$styles');
      expect(result).toEqual(stylesObject);
    });

    it('should handle empty styles object', () => {
      const stylesObject: StylesObjectType = {};

      const result = addGlobalTypographyToStylesObject(stylesObject, false);

      expect(result).not.toHaveProperty('$styles');
      expect(result).toEqual({});
    });

    it('should only match keys with heading or body', () => {
      const stylesObject: StylesObjectType = {
        '$heading-xlarge-bold': { mobile: 'value' } as StylesObjectType,
        '$other-token': 'value',
        '$not-typography': 'value',
      };

      const result = addGlobalTypographyToStylesObject(stylesObject, false);

      expect(result).toHaveProperty('$styles');

      // eslint-disable-next-line dot-notation -- $styles contains special character
      const stylesObj = result['$styles'] as { [key: string]: unknown };

      expect(stylesObj).toHaveProperty('heading-xlarge-bold');
      expect(stylesObj).not.toHaveProperty('other-token');
      expect(stylesObj).not.toHaveProperty('not-typography');
    });
  });
});
