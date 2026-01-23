import { renderHook } from '@testing-library/react';
import { createElement } from 'react';
import { TruncateModes } from '../../../types';
import { truncateByCharacters, truncateByLines, truncateByWords, useTruncatedText } from '../useTruncatedText';

describe('truncateByWords', () => {
  it('should truncate text by words', () => {
    const text = 'This is a very long text that should be truncated';
    expect(truncateByWords(text, 5)).toBe('This is a very long…');
  });

  it('should return original text if word count is less than limit', () => {
    const text = 'Short text';
    expect(truncateByWords(text, 10)).toBe('Short text');
  });

  it('should handle empty string', () => {
    expect(truncateByWords('', 5)).toBe('');
  });

  it('should handle whitespace-only text', () => {
    expect(truncateByWords('   ', 5)).toBe('   ');
  });
});

describe('truncateByCharacters', () => {
  it('should truncate text by characters', () => {
    const text = 'This is a very long text';
    expect(truncateByCharacters(text, 10)).toBe('This is a …');
  });

  it('should return original text if character count is less than limit', () => {
    const text = 'Short';
    expect(truncateByCharacters(text, 10)).toBe('Short');
  });

  it('should handle empty string', () => {
    expect(truncateByCharacters('', 5)).toBe('');
  });
});

describe('truncateByLines', () => {
  it('should return original text unchanged', () => {
    const text = 'This is a text with multiple lines\nSecond line\nThird line';
    expect(truncateByLines(text)).toBe(text);
  });
});

describe('useTruncatedText', () => {
  it('should truncate text by words', () => {
    const text = 'This is a very long text that should be truncated';
    const { result } = renderHook(() => useTruncatedText(text, TruncateModes.WORDS, 5));

    expect(result.current).toBe('This is a very long…');
  });

  it('should truncate text by characters', () => {
    const text = 'This is a very long text that should be truncated';
    const { result } = renderHook(() => useTruncatedText(text, TruncateModes.CHARACTERS, 20));

    expect(result.current).toBe('This is a very long …');
  });

  it('should not truncate when limit is not reached', () => {
    const text = 'Short text';
    const { result } = renderHook(() => useTruncatedText(text, TruncateModes.WORDS, 10));

    expect(result.current).toBe('Short text');
  });

  it('should not truncate when limit is 0 or negative', () => {
    const text = 'This text should not be truncated';
    const { result } = renderHook(() => useTruncatedText(text, TruncateModes.WORDS, 0));

    expect(result.current).toBe('This text should not be truncated');
  });

  it('should handle empty string', () => {
    const { result } = renderHook(() => useTruncatedText('', TruncateModes.WORDS, 5));

    expect(result.current).toBe('');
  });

  it('should handle whitespace-only text', () => {
    const { result } = renderHook(() => useTruncatedText('   ', TruncateModes.WORDS, 5));

    expect(result.current).toBe('   ');
  });

  it('should pass ReactNode content (non-string) without truncation', () => {
    const reactNode = createElement('span', null, 'React content');
    const { result } = renderHook(() => useTruncatedText(reactNode, TruncateModes.WORDS, 5));

    expect(result.current).toBe(reactNode);
  });

  it('should handle lines mode (no truncation)', () => {
    const text = 'This text should not be truncated for lines';
    const { result } = renderHook(() => useTruncatedText(text, TruncateModes.LINES, 2));

    expect(result.current).toBe(text);
  });

  it('should handle undefined limit', () => {
    const text = 'This text should not be truncated';
    const { result } = renderHook(() => useTruncatedText(text, TruncateModes.WORDS, undefined));

    expect(result.current).toBe(text);
  });

  it('should memoize result based on dependencies', () => {
    const text = 'This is a test text';
    const { result, rerender } = renderHook(({ mode, limit }) => useTruncatedText(text, mode, limit), {
      initialProps: { mode: TruncateModes.WORDS, limit: 3 },
    });

    const firstResult = result.current;
    expect(firstResult).toBe('This is a…');

    rerender({ mode: TruncateModes.WORDS, limit: 3 });
    expect(result.current).toBe(firstResult);

    rerender({ mode: TruncateModes.WORDS, limit: 4 });
    expect(result.current).toBe('This is a test…');
  });
});
