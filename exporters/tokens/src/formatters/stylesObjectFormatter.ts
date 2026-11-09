import { isTypographyStyleLeaf, type StylesObjectType } from '../core/types';
import { formatTypographyStyle } from './typographyFormatter';

/**
 * Renders the styles object as the body of an SCSS map. Typography styles are rendered here, the writer is the one
 * that knows the output is SCSS.
 *
 * @param obj
 */
export function convertToScss(obj: StylesObjectType): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (isTypographyStyleLeaf(value)) {
        return `${key}: ${formatTypographyStyle(value.style, false)},\n`;
      }

      if (typeof value === 'object' && value !== null) {
        const nestedScss = convertToScss(value as StylesObjectType);

        return `${key}: (\n${nestedScss}\n),\n`;
      }

      return `${key}: ${value},\n`;
    })
    .join('')
    .slice(0, -1);
}

/**
 * Renders the styles object as the body of a JS object. Typography styles are rendered here, the writer is the one
 * that knows the output is JS.
 *
 * @param obj
 */
export const convertToJs = (obj: StylesObjectType): string => {
  return Object.entries(obj)
    .map(([key, value]) => {
      const match = key.match(/^_(\d+)/); // Match keys starting with _ followed by a number
      const newKey = match ? `'${match[1]}'` : key; // Replace with the number as a string if matched
      let resultEntry = `${newKey}: ${value},\n`;

      if (isTypographyStyleLeaf(value)) {
        resultEntry = `${newKey}: ${formatTypographyStyle(value.style, true)},\n`;
      } else if (typeof value === 'object' && value !== null) {
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
