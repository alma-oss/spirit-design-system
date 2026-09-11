import React from 'react';
import { getNodeText } from '../getNodeText';

describe('getNodeText', () => {
  it('should return empty string for nullish and boolean values', () => {
    expect(getNodeText(null)).toBe('');
    expect(getNodeText(undefined)).toBe('');
    expect(getNodeText(false)).toBe('');
  });

  it('should stringify primitives', () => {
    expect(getNodeText('Czech')).toBe('Czech');
    expect(getNodeText(42)).toBe('42');
  });

  it('should flatten nested JSX and normalize whitespace', () => {
    expect(
      getNodeText(
        <>
          {'  Czech  '}
          <em> Republic </em>
        </>,
      ),
    ).toBe('Czech Republic');
  });

  it('should join array children with spaces', () => {
    expect(getNodeText(['Hello', ' ', 'world'])).toBe('Hello world');
  });

  it('should keep all content when no skip predicate is given', () => {
    expect(
      getNodeText(
        <>
          Languages
          <span aria-hidden>Decorative hint</span>
        </>,
      ),
    ).toBe('Languages Decorative hint');
  });

  it('should skip elements matching the shouldSkipElement predicate, including their subtree', () => {
    const shouldSkipElement = (element: React.ReactElement) =>
      (element.props as { 'data-skip'?: boolean })['data-skip'] === true;

    expect(
      getNodeText(
        <>
          Languages
          <span data-skip>
            <em>Decorative hint</em>
          </span>
        </>,
        { shouldSkipElement },
      ),
    ).toBe('Languages');
    expect(getNodeText(<span data-skip>Hidden</span>, { shouldSkipElement })).toBe('');
  });
});
