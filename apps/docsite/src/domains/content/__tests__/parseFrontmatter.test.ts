import { parseCanonicalFrontmatter } from '../parseFrontmatter';

describe('parseCanonicalFrontmatter', () => {
  it('reads the title and leaves the body', () => {
    const raw = `---
title: Button
---

Hello
`;

    expect(parseCanonicalFrontmatter(raw)).toEqual({
      data: { title: 'Button' },
      body: '\nHello\n',
    });
  });

  it('returns an empty title when frontmatter is missing', () => {
    expect(parseCanonicalFrontmatter('Hello')).toEqual({ data: { title: '' }, body: 'Hello' });
  });
});
