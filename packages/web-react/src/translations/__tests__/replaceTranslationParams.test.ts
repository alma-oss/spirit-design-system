import { replaceTranslationParams } from '../replaceTranslationParams';

describe('replaceTranslationParams', () => {
  it('should return translation unchanged when params is empty', () => {
    expect(replaceTranslationParams('Hello, {name}!', {})).toBe('Hello, {name}!');
  });

  it('should replace single placeholder', () => {
    expect(replaceTranslationParams('Hello, {name}!', { name: 'World' })).toBe('Hello, World!');
  });

  it('should replace all occurrences when same placeholder appears twice', () => {
    expect(replaceTranslationParams('Hi {name}, hello {name}!', { name: 'World' })).toBe('Hi World, hello World!');
  });

  it('should replace multiple placeholders', () => {
    expect(replaceTranslationParams('Page {current} of {total}', { current: 2, total: 10 })).toBe('Page 2 of 10');
  });

  it('should convert param values to string', () => {
    expect(replaceTranslationParams('Count: {count}', { count: 42 })).toBe('Count: 42');
  });
});
