import { passObjectKeyValueToCallback } from '../helpers/objectHelper';
import type { KeyValueTemplateCallback } from '../helpers/types';
import type { TypographyStyle } from '../core/types';
import { removePairQuotes, toKebabCase } from '../helpers/stringHelper';

export const jsObjectTemplate = (strings: string[]) => `{
${strings.join(',\n')},
}`;

export const scssObjectTemplate = (strings: string[]) => `(
${strings.join(',\n')},
)`;

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

/**
 * Renders a typography style as an SCSS map or a JS object.
 *
 * @param style
 * @param hasJsOutput - JS object instead of SCSS map
 */
export const formatTypographyStyle = (style: TypographyStyle, hasJsOutput: boolean): string =>
  hasJsOutput
    ? jsObjectTemplate(passObjectKeyValueToCallback<TypographyStyle>(style, jsKeyValueTemplate))
    : scssObjectTemplate(passObjectKeyValueToCallback<TypographyStyle>(style, scssKeyValueTemplate));
