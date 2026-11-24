import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { composePageMarkdown, listDocumentedPages, type DocumentedPageOptions } from '../documentedPages';
import { renderLlmsFull, renderLlmsTxt } from '../llmsText';
import { getSiteOrigin } from '../siteOrigin';

const writeFile = async (filePath: string, contents: string) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents, 'utf8');
};

const dedent = (source: string): string => {
  const text = source.replace(/^\n/, '').replace(/\n[ \t]*$/, '');
  const lines = text.split('\n');
  const indent = lines
    .filter((line) => line.trim().length > 0)
    .reduce((smallest, line) => Math.min(smallest, line.match(/^[ \t]*/)?.[0].length ?? 0), Number.POSITIVE_INFINITY);

  return `${lines.map((line) => line.slice(indent)).join('\n')}\n`;
};

const roots: string[] = [];

afterEach(async () => {
  await Promise.all(roots.splice(0).map((directory) => fs.rm(directory, { recursive: true, force: true })));
});

const createFixture = async (): Promise<DocumentedPageOptions> => {
  const contentRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'llms-content-'));
  const repoRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'llms-repo-'));

  roots.push(contentRoot, repoRoot);

  await writeFile(
    path.join(contentRoot, 'introduction', 'index.md'),
    dedent(`
      ---
      title: Introduction
      ---

      [Components](/components)
    `),
  );
  await writeFile(
    path.join(contentRoot, 'development', 'helpers', 'links.md'),
    dedent(`
      # Links

      Link styling sentence.
    `),
  );
  const buttonDocs = path.join(repoRoot, 'packages/web-react/src/components/Button');

  await writeFile(
    path.join(buttonDocs, 'README.md'),
    dedent(`
      # Button

      Triggers an action.
    `),
  );
  await writeFile(
    path.join(buttonDocs, 'docs', 'overview.md'),
    dedent(`
      ---
      title: Ignored Heading
      ---

      \`\`\`scss
      $button-height: 1;
      \`\`\`
    `),
  );
  await writeFile(
    path.join(buttonDocs, 'docs', 'design.md'),
    dedent(`
      # Button

      Quiet surface for the design tab.

      ## Tokens
    `),
  );
  await writeFile(
    path.join(buttonDocs, 'docs', 'figma.md'),
    dedent(`
      # Figma

      This figma tab should stay hidden.
    `),
  );
  await writeFile(
    path.join(buttonDocs, 'docs', 'playground.json'),
    JSON.stringify({
      component: 'Button',
      controls: [],
      figmaUrl: 'https://www.figma.com/design/abc',
      hiddenTabs: ['web'],
    }),
  );
  await writeFile(
    path.join(repoRoot, 'packages/web/src/scss/components/Button/README.md'),
    dedent(`
      # Button

      Web markup for the button.
    `),
  );
  await writeFile(
    path.join(repoRoot, 'packages/web-react/src/components/Tag/README.md'),
    dedent(`
      # Tag

      Tags label a value.
    `),
  );
  await writeFile(path.join(repoRoot, 'packages/icons/src/svg/calendar.svg'), '<svg></svg>');
  await writeFile(path.join(repoRoot, 'packages/web/src/scss/helpers/clearfix/preview.html'), '<div></div>');

  return { contentRoot, repoRoot };
};

const urlsIn = (markdown: string): string[] =>
  [...markdown.matchAll(/\]\((https:[^)]+)\)/g)].map((match) => match[1] ?? '');

describe('composePageMarkdown', () => {
  it('keeps a code fence and drops front matter', async () => {
    const options = await createFixture();
    const overview = await composePageMarkdown(['components', 'button'], options);

    expect(overview).toContain('```scss');
    expect(overview).toContain('$button-height: 1;');
    expect(overview).toContain('# Ignored Heading');
    expect(overview).not.toContain('---');
    expect(overview).not.toContain('Quiet surface for the design tab.');
  });

  it('returns one tab and nothing for hidden, missing, preview, or helper urls', async () => {
    const options = await createFixture();

    await expect(composePageMarkdown(['components', 'button', 'design'], options)).resolves.toContain(
      'Quiet surface for the design tab.',
    );
    await expect(composePageMarkdown(['components', 'button', 'web'], options)).resolves.toBeNull();
    await expect(composePageMarkdown(['components', 'button', 'web-preview'], options)).resolves.toBeNull();
    await expect(composePageMarkdown(['components', 'button', 'figma'], options)).resolves.toBeNull();
    await expect(composePageMarkdown(['components', 'button', 'accessibility'], options)).resolves.toBeNull();
    await expect(composePageMarkdown(['components', 'tag'], options)).resolves.toBeNull();
    await expect(composePageMarkdown(['components', 'missing'], options)).resolves.toBeNull();
    await expect(composePageMarkdown(['helpers', 'clearfix'], options)).resolves.toBeNull();
    await expect(composePageMarkdown([], options)).resolves.toBeNull();
  });

  it('uses the front-matter title when the page is only links', async () => {
    const options = await createFixture();
    const introduction = await composePageMarkdown(['introduction'], options);

    expect(introduction).toContain('# Introduction');
    expect(introduction).toContain('[Components](/components)');
    expect(introduction).not.toContain('---');
  });
});

describe('llms.txt and llms-full.txt', () => {
  it('lists every documented fixture page once, with markdown urls', async () => {
    const options = await createFixture();
    const pages = await listDocumentedPages(options);
    const llms = renderLlmsTxt(pages);
    const full = renderLlmsFull(pages);
    const urls = urlsIn(llms);
    const origin = getSiteOrigin();
    const pageUrl = (pagePath: string) => `${origin}${pagePath}?format=md`;

    expect(urls.every((url) => url.startsWith(`${origin}/`) && url.endsWith('?format=md'))).toBe(true);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toEqual(
      expect.arrayContaining([
        pageUrl('/introduction'),
        pageUrl('/development'),
        pageUrl('/development/helpers'),
        pageUrl('/development/helpers/links'),
        pageUrl('/components'),
        pageUrl('/components/button'),
        pageUrl('/components/button/design'),
        pageUrl('/components/button/react'),
        pageUrl('/components/tag/react'),
        pageUrl('/icons'),
        pageUrl('/helpers'),
      ]),
    );
    expect(urls).not.toContain(pageUrl('/'));
    expect(urls).not.toContain(pageUrl('/components/button/web'));
    expect(urls).not.toContain(pageUrl('/components/button/figma'));
    expect(urls).not.toContain(pageUrl('/components/tag'));
    expect(urls).not.toContain(pageUrl('/helpers/clearfix'));

    expect(llms).toContain(`[Introduction](${pageUrl('/introduction')}): Introduction`);
    expect(llms).toContain(`[Links](${pageUrl('/development/helpers/links')}): Link styling sentence.`);
    expect(llms).toContain(`[Button](${pageUrl('/components/button')}): Triggers an action.`);
    expect(llms).toContain(
      `[Button — Design](${pageUrl('/components/button/design')}): Quiet surface for the design tab.`,
    );
    expect(llms).toContain(`[Button — React](${pageUrl('/components/button/react')}): Triggers an action.`);
    expect(llms.indexOf('## Introduction')).toBeLessThan(llms.indexOf('## Components'));
    expect(llms.indexOf('## Components')).toBeLessThan(llms.indexOf('## Icons'));
    expect(llms.indexOf('## Icons')).toBeLessThan(llms.indexOf('## Helpers'));
    expect(llms.indexOf('## Helpers')).toBeLessThan(llms.indexOf('## Development'));
    expect(llms.indexOf('/components?format=md')).toBeLessThan(llms.indexOf('/components/button?format=md'));
    expect(llms.indexOf('/components/button?format=md')).toBeLessThan(
      llms.indexOf('/components/button/design?format=md'),
    );
    expect(llms.indexOf('/components/button/design?format=md')).toBeLessThan(
      llms.indexOf('/components/button/react?format=md'),
    );
    expect(llms.indexOf('/components/button/react?format=md')).toBeLessThan(
      llms.indexOf('/components/tag/react?format=md'),
    );

    const catalog = pages.find((page) => page.path === '/components');
    const icons = pages.find((page) => page.path === '/icons');
    const helpers = pages.find((page) => page.path === '/helpers');

    expect(catalog?.body).toContain('[Tag](/components/tag/react)');
    expect(catalog?.body).not.toMatch(/\[Tag\]\(\/components\/tag\)/);
    expect(icons?.body).toContain('- calendar');
    expect(helpers?.body).toContain('- Clearfix');

    expect(full).toContain(
      `### Button — Design\n\n${pageUrl('/components/button/design')}\n\n# Button\n\nQuiet surface for the design tab.`,
    );
    expect(full.split('Quiet surface for the design tab.')).toHaveLength(2);
  });

  it('rethrows when the icon path is not a directory', async () => {
    const options = await createFixture();

    await fs.rm(path.join(options.repoRoot ?? '', 'packages/icons/src/svg'), { recursive: true });
    await fs.writeFile(path.join(options.repoRoot ?? '', 'packages/icons/src/svg'), 'not-a-directory');

    await expect(listDocumentedPages(options)).rejects.toMatchObject({ code: 'ENOTDIR' });
  });
});
