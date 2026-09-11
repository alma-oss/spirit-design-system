import { type ReactNode, isValidElement } from 'react';

const normalizeWhitespace = (text: string) => text.replace(/\s+/g, ' ').trim();

const collectNodeText = (value: ReactNode): string => {
  if (value == null || typeof value === 'boolean') {
    return '';
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(collectNodeText).filter(Boolean).join(' ');
  }

  if (isValidElement(value)) {
    const { 'aria-hidden': ariaHidden, children } = value.props as {
      'aria-hidden'?: boolean | string;
      children?: ReactNode;
    };

    // Content hidden from assistive technologies is excluded from accessible names.
    if (ariaHidden === true || ariaHidden === 'true') {
      return '';
    }

    return collectNodeText(children);
  }

  return '';
};

/**
 * Flattens a ReactNode to plain text (for aria-labels / collection textValue).
 * Joins array children with spaces, normalizes whitespace, and skips `aria-hidden` subtrees.
 *
 * @param node React node
 */
export const getNodeText = (node: ReactNode): string => normalizeWhitespace(collectNodeText(node));
