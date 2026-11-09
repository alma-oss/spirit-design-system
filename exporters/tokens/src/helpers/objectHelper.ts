import { Token, TokenType } from '@supernovaio/sdk-exporters';
import { StylesObjectType } from '../generators/stylesObjectGenerator';
import { handleInvariantTokenAlias } from './specialCaseHelper';
import { removePairQuotes, toCamelCase, toKebabCase, toPlural } from './stringHelper';
import { COLOR_SCSS_SUFFIX } from '../constants';

export const deepMergeObjects = (obj1: StylesObjectType, obj2: StylesObjectType): StylesObjectType => {
  // First, perform the deep merge logic
  const mergedObject = Object.entries(obj2).reduce(
    (result, [key, value]) => {
      let mergedValue;

      if (typeof value === 'object' && value !== null && typeof result[key] === 'object') {
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
    if (typeof value === 'object' && value !== null && value.moveToTheEnd === 'true') {
      // Move this entry to endObject
      delete value.moveToTheEnd; // Exclude "moveToTheEnd" flag
      endObject[key] = value;
    } else {
      // Keep it in the main object
      finalObject[key] = value;
    }
  });

  // Return finalObject with endObject entries moved to the end
  return { ...finalObject, ...endObject };
};

export function convertToScss(obj: StylesObjectType): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        const nestedScss = convertToScss(value as StylesObjectType);

        return `${key}: (\n${nestedScss}\n),\n`;
      }

      return `${key}: ${value},\n`;
    })
    .join('')
    .slice(0, -1);
}

export const convertToJs = (obj: StylesObjectType): string => {
  return Object.entries(obj)
    .map(([key, value]) => {
      const match = key.match(/^_(\d+)/); // Match keys starting with _ followed by a number
      const newKey = match ? `'${match[1]}'` : key; // Replace with the number as a string if matched
      let resultEntry = `${newKey}: ${value},\n`;

      if (typeof value === 'object' && value !== null) {
        const nestedObject = convertToJs(value as StylesObjectType);

        resultEntry = `${newKey}: {\n${nestedObject}\n},\n`;
      }

      if (newKey === value) {
        resultEntry = `${newKey},\n`;
      }

      return resultEntry;
    })
    .join('')
    .slice(0, -1);
};

export const formatTypographyName = (tokenNameParts: string[]): string => {
  return tokenNameParts.length === 4
    ? tokenNameParts.filter((_, index) => index !== 1).join('-')
    : tokenNameParts.join('-');
};

export const getBreakpoint = (tokenNameParts: string[]): string => {
  return tokenNameParts.length === 4 ? tokenNameParts[1] : 'mobile';
};

export const getTokenAlias = (token: Token, hasJsOutput: boolean): string => {
  let alias;
  const numericPart = token.name.match(/\d+/)?.[0];
  const nonNumericPart = handleInvariantTokenAlias(token.name.toLowerCase());

  if (token.tokenType !== TokenType.color && numericPart) {
    alias = numericPart;
  } else {
    alias = hasJsOutput ? toCamelCase(nonNumericPart) : nonNumericPart;
  }

  return alias;
};

export const normalizeFirstNamePart = (part: string, tokenType: TokenType, hasJsOutput: boolean): string => {
  if (tokenType === TokenType.color) {
    const partNameWithColorSuffix = `${part.toLowerCase()}${COLOR_SCSS_SUFFIX}`;

    return hasJsOutput ? toCamelCase(partNameWithColorSuffix) : `$${partNameWithColorSuffix}`;
  }

  return hasJsOutput ? toPlural(part.toLowerCase()) : `$${toPlural(part.toLowerCase())}`;
};

export const jsObjectTemplate = (strings: string[]) => `{
${strings.join(',\n')},
}`;

export const scssObjectTemplate = (strings: string[]) => `(
${strings.join(',\n')},
)`;

export type KeyValueTemplateCallback = (key: string, value: string | number) => string;

export const jsKeyValueTemplate: KeyValueTemplateCallback = (key, value) => {
  return `${key}: ${/\s/.test(value as string) ? `"${value}"` : value}`;
};

export const scssKeyValueTemplate: KeyValueTemplateCallback = (key, value) => {
  const formattedKey = toKebabCase(key);
  let formattedValue;

  if (typeof value === 'string' && value.includes(', ')) {
    formattedValue = `"${value}"`;
  } else if (typeof value === 'number') {
    formattedValue = value;
  } else {
    formattedValue = removePairQuotes(value as string);
  }

  return `${formattedKey}: ${formattedValue}`;
};

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
