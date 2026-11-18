import { Token, TokenType } from '@supernovaio/sdk-exporters';
import { getAliasName } from './namingHelper';
import { isTypographyStyleLeaf, type StylesObjectType } from '../core/types';
import type { KeyValueTemplateCallback } from './types';
import { toCamelCase, toPlural } from './stringHelper';
import { COLOR_SCSS_SUFFIX } from '../constants';

export const deepMergeObjects = (obj1: StylesObjectType, obj2: StylesObjectType): StylesObjectType => {
  // First, perform the deep merge logic
  const mergedObject = Object.entries(obj2).reduce(
    (result, [key, value]) => {
      let mergedValue;

      if (
        typeof value === 'object' &&
        value !== null &&
        !isTypographyStyleLeaf(value) &&
        typeof result[key] === 'object' &&
        !isTypographyStyleLeaf(result[key])
      ) {
        mergedValue = deepMergeObjects(result[key] as StylesObjectType, value as StylesObjectType);
      } else {
        mergedValue = value;
      }

      return { ...result, [key]: mergedValue };
    },
    { ...obj1 },
  );

  // Now, process the object to move keys with "moveToTheEnd": true to the end
  const finalObject: StylesObjectType = {};
  const endObject: StylesObjectType = {};

  Object.entries(mergedObject).forEach(([key, value]) => {
    const flaggedValue = value as { moveToTheEnd?: string };

    if (typeof value === 'object' && value !== null && flaggedValue.moveToTheEnd === 'true') {
      // Move this entry to endObject
      delete flaggedValue.moveToTheEnd; // Exclude "moveToTheEnd" flag
      endObject[key] = value;
    } else {
      // Keep it in the main object
      finalObject[key] = value;
    }
  });

  // Return finalObject with endObject entries moved to the end
  return { ...finalObject, ...endObject };
};

export const getTokenAlias = (token: Token, hasJsOutput: boolean): string =>
  getAliasName(token.name, token.tokenType === TokenType.color, hasJsOutput);

export const normalizeFirstNamePart = (part: string, tokenType: TokenType, hasJsOutput: boolean): string => {
  if (tokenType === TokenType.color) {
    const partNameWithColorSuffix = `${part.toLowerCase()}${COLOR_SCSS_SUFFIX}`;

    return hasJsOutput ? toCamelCase(partNameWithColorSuffix) : `$${partNameWithColorSuffix}`;
  }

  return hasJsOutput ? toPlural(part.toLowerCase()) : `$${toPlural(part.toLowerCase())}`;
};

/**
 * Passes every defined entry of an object to the callback and collects the results. Entries with an `undefined`
 * value are skipped.
 *
 * @param object
 * @param callback
 */
export const passObjectKeyValueToCallback = <Shape extends Record<string, string | number | undefined>>(
  object: Shape,
  callback: KeyValueTemplateCallback,
) => {
  return Object.entries(object).reduce<string[]>((accumulator, [key, value]) => {
    if (value === undefined) {
      return accumulator;
    }

    accumulator.push(callback(key, value));

    return accumulator;
  }, []);
};
