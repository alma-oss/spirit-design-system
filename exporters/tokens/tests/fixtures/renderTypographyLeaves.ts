import { isTypographyStyleLeaf } from '../../src/core/types';
import { formatTypographyStyle } from '../../src/formatters/typographyFormatter';

/**
 * Replaces the typography style leaves of a styles object with their SCSS map / JS object output, so that tests of
 * the object processors can assert the final value without caring that rendering belongs to the writer.
 *
 * @param value
 * @param hasJsOutput
 */
export const renderTypographyLeaves = (value: unknown, hasJsOutput = false): unknown => {
  if (isTypographyStyleLeaf(value)) {
    return formatTypographyStyle(value.style, hasJsOutput);
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, renderTypographyLeaves(nested, hasJsOutput)]),
    );
  }

  return value;
};
