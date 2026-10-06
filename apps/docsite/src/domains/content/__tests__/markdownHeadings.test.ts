import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { markdownHeadingPropsByTag } from '../markdownHeadings';

const pluginPath = path.join(__dirname, '../plugins/rehypeNormalizeHeadings.mjs');

const heading = (tagName: string) => ({ type: 'element', tagName, children: [] as unknown[] });

const runPlugin = (children: Record<string, unknown>[]) => {
  const script = `
    import plugin from ${JSON.stringify(pluginPath)};
    const tree = ${JSON.stringify({ type: 'root', children })};
    plugin()(tree);
    process.stdout.write(JSON.stringify({
      tags: tree.children.map((child) => child.tagName),
      nested: tree.children.map((child) => child.children?.[0]?.tagName ?? null),
    }));
  `;

  return JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', script], { encoding: 'utf8' })) as {
    tags: string[];
    nested: (string | null)[];
  };
};

describe('rehypeNormalizeHeadings', () => {
  it('keeps an h2 then h3 under the page h1', () => {
    expect(runPlugin([heading('h2'), heading('h3')]).tags).toEqual(['h2', 'h3']);
  });

  it('closes a skipped level without nesting later siblings', () => {
    expect(runPlugin([heading('h2'), heading('h4'), heading('h4')]).tags).toEqual(['h2', 'h3', 'h3']);
  });

  it('returns to a shallower original level as a sibling of the promoted parent', () => {
    expect(runPlugin([heading('h4'), heading('h5'), heading('h4')]).tags).toEqual(['h2', 'h3', 'h2']);
  });

  it('starts a new outline after a dropped mid-document h1', () => {
    expect(runPlugin([heading('h2'), heading('h3'), heading('h1'), heading('h3')]).tags).toEqual(['h2', 'h3', 'h2']);
  });

  it('drops a markdown h1, promotes siblings under the page h1, and leaves headings in code alone', () => {
    const result = runPlugin([
      heading('h1'),
      heading('h4'),
      heading('h3'),
      { type: 'element', tagName: 'pre', children: [heading('h5')] },
    ]);

    expect(result.tags).toEqual(['h2', 'h2', 'pre']);
    expect(result.nested[2]).toBe('h5');
  });
});

describe('markdownHeadingPropsByTag', () => {
  it('gives each level a distinct size or weight on the Heading scale', () => {
    const signatures = Object.values(markdownHeadingPropsByTag).map(
      (props) => `${props.size}:${props.fontWeight ?? 'bold'}`,
    );

    expect(new Set(signatures).size).toBe(signatures.length);
  });

  it('tightens the top margin as the level gets deeper', () => {
    const topMargins = Object.values(markdownHeadingPropsByTag).map((props) => props.marginTop);

    expect(topMargins).toEqual(['space-1200', 'space-1000', 'space-800', 'space-700', 'space-600']);
  });
});
