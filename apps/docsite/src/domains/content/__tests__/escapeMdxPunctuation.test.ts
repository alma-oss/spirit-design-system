import { escapeMdxPunctuation } from '../escapeMdxPunctuation';

describe('escapeMdxPunctuation', () => {
  it('escapes HTML outside fenced code so repo markdown compiles as MDX', () => {
    expect(escapeMdxPunctuation('<details>\n\n```html\n<button></button>\n```\n')).toBe(
      '&lt;details>\n\n```html\n<button></button>\n```\n',
    );
  });
});
