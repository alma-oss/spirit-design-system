import { escapeMdxPunctuation } from '../escapeMdxPunctuation';
import { prepareMarkdownSource } from '../prepareMarkdownSource';

describe('escapeMdxPunctuation', () => {
  it('escapes HTML outside fenced code so repo markdown compiles as MDX', () => {
    expect(escapeMdxPunctuation('<details>\n\n```html\n<button></button>\n```\n')).toBe(
      '&lt;details>\n\n```html\n<button></button>\n```\n',
    );
  });

  it('does not escape extracted Canonical Pages a second time', () => {
    const canonical = 'Use &lt;button> with \\{children\\}.';
    const repository = 'Use <button> with {children}.';

    expect(prepareMarkdownSource(canonical, true)).toBe(canonical);
    expect(prepareMarkdownSource(repository, false)).toBe('Use &lt;button> with \\{children\\}.');
  });
});
