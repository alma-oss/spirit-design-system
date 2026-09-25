import { escapeMdxPunctuation } from '../escapeMdxPunctuation';
import { prepareMarkdownSource } from '../prepareMarkdownSource';

describe('escapeMdxPunctuation', () => {
  it('escapes HTML outside fenced code so repo markdown compiles as MDX', () => {
    expect(escapeMdxPunctuation('<details>\n\n```html\n<button></button>\n```\n')).toBe(
      '&lt;details>\n\n```html\n<button></button>\n```\n',
    );
  });

  it('preserves every fenced code block, not only the first', () => {
    const input = 'Before <tag>\n\n```html\n<button></button>\n```\n\nMiddle {x}\n\n```js\nconst y = 1;\n```\n';

    expect(escapeMdxPunctuation(input)).toBe(
      'Before &lt;tag>\n\n```html\n<button></button>\n```\n\nMiddle \\{x\\}\n\n```js\nconst y = 1;\n```\n',
    );
  });

  it('does not escape extracted Canonical Pages a second time', () => {
    const canonical = 'Use &lt;button> with \\{children\\}.';
    const repository = 'Use <button> with {children}.';

    expect(prepareMarkdownSource(canonical, true)).toBe(canonical);
    expect(prepareMarkdownSource(repository, false)).toBe('Use &lt;button> with \\{children\\}.');
  });
});
