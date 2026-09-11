import { type ReactElement, type ReactNode, isValidElement } from 'react';

/** Options of `getNodeText`. */
export interface GetNodeTextOptions {
  /** Predicate leaving matching elements and their subtrees out of the text. */
  shouldSkipElement?: (element: ReactElement) => boolean;
}

const normalizeWhitespace = (text: string) => text.replace(/\s+/g, ' ').trim();

const collectNodeText = (value: ReactNode, shouldSkipElement?: GetNodeTextOptions['shouldSkipElement']): string => {
  if (value == null || typeof value === 'boolean') {
    return '';
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((child) => collectNodeText(child, shouldSkipElement))
      .filter(Boolean)
      .join(' ');
  }

  if (isValidElement(value)) {
    if (shouldSkipElement?.(value)) {
      return '';
    }

    return collectNodeText((value.props as { children?: ReactNode }).children, shouldSkipElement);
  }

  return '';
};

/**
 * Flattens a ReactNode to plain text (for aria-labels / collection textValue).
 * Joins array children with spaces and normalizes whitespace.
 *
 * @param node React node
 * @param options Options
 * @param options.shouldSkipElement Predicate leaving matching elements and their subtrees out of the text
 */
export const getNodeText = (node: ReactNode, options: GetNodeTextOptions = {}): string =>
  normalizeWhitespace(collectNodeText(node, options.shouldSkipElement));
