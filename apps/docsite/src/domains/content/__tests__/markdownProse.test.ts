import { firstProseSentence, renderMarkdownDocument } from '../markdownProse';

describe('firstProseSentence', () => {
  it('keeps identifiers that contain underscores', () => {
    expect(firstProseSentence('Set max_width to 10.')).toBe('Set max_width to 10.');
  });

  it('does not end a sentence before a lowercase continuation', () => {
    expect(firstProseSentence('Use e.g. a button to submit.')).toBe('Use e.g. a button to submit.');
  });

  it('skips the unstable warning and uses the next sentence', () => {
    expect(firstProseSentence('⚠️ This component is unstable.\n\nIt triggers an action.')).toBe(
      'It triggers an action.',
    );
  });

  it('skips raw html and a nested fence', () => {
    const source = [
      '<div>Not a description</div>',
      '',
      '````md',
      '```',
      'Inner example that must not win.',
      '```',
      '````',
      '',
      'The actual description.',
    ].join('\n');

    expect(firstProseSentence(source)).toBe('The actual description.');
  });
});

describe('renderMarkdownDocument', () => {
  it('adds a title when the only heading is inside a fence', () => {
    const source = '```bash\n# comment\n```';

    expect(renderMarkdownDocument(source, 'Title')).toBe('# Title\n\n```bash\n# comment\n```\n');
  });
});
