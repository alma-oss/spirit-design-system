import { splitMarkdownSections } from '../splitMarkdownSections';

describe('splitMarkdownSections', () => {
  it('starts a new block at every level 2 heading', () => {
    expect(splitMarkdownSections('intro\n\n## One\n\ntext\n\n## Two\n\nmore')).toEqual([
      'intro',
      '## One\n\ntext',
      '## Two\n\nmore',
    ]);
  });

  it('keeps front matter in the first block', () => {
    const [first] = splitMarkdownSections('---\ntitle: Button\n---\n\n## One\n\ntext');

    expect(first).toContain('title: Button');
    expect(first).toContain('## One');
  });

  it('does not split on headings inside code fences', () => {
    expect(splitMarkdownSections('## One\n\n```md\n## Not a heading\n```\n\n## Two')).toHaveLength(2);
  });

  it('does not create an empty first block when the document starts with a heading', () => {
    expect(splitMarkdownSections('## One\n\ntext')).toEqual(['## One\n\ntext']);
  });

  it('does not split on deeper headings', () => {
    expect(splitMarkdownSections('## One\n\n### Sub\n\ntext')).toEqual(['## One\n\n### Sub\n\ntext']);
  });

  describe('documents with level 3 sections', () => {
    const source = [
      '---',
      'title: Button',
      '---',
      '',
      '#### Component Status',
      '',
      'Up to date',
      '',
      '### Design Usage',
      '',
      'text',
      '',
      '---',
      '',
      '### **When to Use**',
      '',
      '#### Label',
      '',
      'more',
    ].join('\n');

    it('splits at the shallowest section level and shifts the headings up', () => {
      expect(splitMarkdownSections(source)).toEqual([
        '---\ntitle: Button\n---\n\n## Component Status\n\nUp to date',
        '## Design Usage\n\ntext',
        '## When to Use\n\n### Label\n\nmore',
      ]);
    });

    it('drops the thematic breaks between the blocks', () => {
      const [, ...blocks] = splitMarkdownSections(source);

      expect(blocks.join('\n')).not.toMatch(/^---$/m);
    });
  });

  it('keeps a Setext underline, it is not a separator', () => {
    expect(splitMarkdownSections('## One\n\nTitle\n---\n\ntext').join('\n')).toContain('Title\n---');
  });
});
