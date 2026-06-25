import { COLOR_JS_SUFFIX, COLOR_KEY, COLOR_SCSS_SUFFIX, TYPOGRAPHY_KEY } from '../constants';
import type { StylesObjectType } from '../generators/stylesObjectGenerator';

export const parseGroupName = (colorVariable: string, hasJsOutput: boolean) => {
  const suffix = hasJsOutput ? COLOR_JS_SUFFIX : COLOR_SCSS_SUFFIX;

  return colorVariable.replace(suffix, '').replace('$', '');
};

export const colorGroupsReducer = (accumulatedColorKeys: { [key: string]: string }, currentColorKey: string) => ({
  ...accumulatedColorKeys,
  [parseGroupName(currentColorKey, false)]: currentColorKey,
});

export const typographyGroupReducer = (
  accumulatedTypographyKeys: { [key: string]: string },
  currentTypographyKey: string,
) => ({
  ...accumulatedTypographyKeys,
  [parseGroupName(currentTypographyKey, false)]: currentTypographyKey,
});

export const createGlobalColorsObject = (colorKeys: Array<string>, hasJsOutput: boolean) => {
  return colorKeys.reduce((accumulatedColorKeys: { [key: string]: string }, currentColorKey: string) => {
    return {
      ...accumulatedColorKeys,
      [parseGroupName(currentColorKey, hasJsOutput)]: currentColorKey,
    };
  }, {});
};

export const createGlobalTypographyObject = (typographyKeys: Array<string>) => {
  return typographyKeys.reduce(typographyGroupReducer, {});
};

const hasTypographyDeclaration = (value: unknown, hasJsOutput: boolean): boolean => {
  const typographyProperty = hasJsOutput ? 'fontFamily' : 'font-family';

  if (typeof value === 'string') {
    return value.includes(typographyProperty);
  }

  if (typeof value === 'object' && value !== null) {
    return Object.values(value).some((nestedValue) => hasTypographyDeclaration(nestedValue, hasJsOutput));
  }

  return false;
};

export const addGlobalColorsToStylesObject = (
  stylesObject: StylesObjectType,
  hasJsOutput: boolean,
): StylesObjectType => {
  const colorKeys = Object.keys(stylesObject).filter((key) => {
    return key.endsWith(hasJsOutput ? COLOR_JS_SUFFIX : COLOR_SCSS_SUFFIX);
  });

  if (colorKeys.length === 0) {
    return stylesObject;
  }

  const colorsObject = createGlobalColorsObject(colorKeys, hasJsOutput);
  const key = hasJsOutput ? COLOR_KEY : `$${COLOR_KEY}`;

  return { ...stylesObject, [key]: colorsObject };
};

export const addGlobalTypographyToStylesObject = (
  stylesObject: StylesObjectType,
  hasJsOutput: boolean,
): StylesObjectType => {
  const typographyKeys = Object.entries(stylesObject)
    .filter(([, value]) => hasTypographyDeclaration(value, hasJsOutput))
    .map(([key]) => key);

  if (typographyKeys.length === 0) {
    return stylesObject;
  }

  const typographyObject = createGlobalTypographyObject(typographyKeys);
  const key = hasJsOutput ? TYPOGRAPHY_KEY : `$${TYPOGRAPHY_KEY}`;

  // Typography has multiple groups, which creates multiple '$styles' objects.
  // After merging the '$styles' objects together, they remain in the middle of the tokens,
  // so we need to move them to the end of the file using the 'moveToTheEnd' flag,
  // which will be removed in the final output.
  return { ...stylesObject, [key]: { ...typographyObject, moveToTheEnd: 'true' } };
};
