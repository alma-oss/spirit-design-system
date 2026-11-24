import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fetchAllHelpers } from '@local/domains/helpers/repositories/helpersRepository';
import { fetchAllIcons } from '@local/domains/icons/repositories/iconsRepository';
import { listDocSlugs } from '../contentNavigation';
import { composePageMarkdown, listDocumentedPages, type DocumentedPageOptions } from '../documentedPages';
import { renderLlmsFull, renderLlmsTxt } from '../llmsText';

const writeFile = async (filePath: string, contents: string) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents, 'utf8');
};

const createFixture = async (): Promise<DocumentedPageOptions> => {
  const contentRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'llms-content-'));
  const repoRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'llms-repo-'));

  await writeFile(
    path.join(contentRoot, 'introduction', 'index.md'),
    `---
title: Introduction
---

[Components](/components)
`,
  );
  await writeFile(
    path.join(contentRoot, 'development', 'helpers', 'links.md'),
    `---
title: Helpers
---

Link styling sentence.
`,
  );

  const buttonDocs = path.join(repoRoot, 'packages/web-react/src/components/Button');

  await writeFile(
    path.join(buttonDocs, 'README.md'),
    `# Button

Triggers an action.

## Usage
`,
  );
  await writeFile(
    path.join(buttonDocs, 'docs', 'overview.md'),
    `---
title: Ignored Heading
---

\`\`\`scss
$button-height: 1;
\`\`\`
`,
  );
  await writeFile(
    path.join(buttonDocs, 'docs', 'design.md'),
    `# Button

Quiet surface for the design tab.

## Tokens
`,
  );
  await writeFile(
    path.join(buttonDocs, 'docs', 'figma.md'),
    `# Figma

This figma tab should stay hidden.
`,
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
    `# Button

Web markup for the button.
`,
  );
  await writeFile(
    path.join(repoRoot, 'packages/web-react/src/components/Tag/README.md'),
    `# Tag

Tags label a value.
`,
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

    expect(urls.every((url) => url.startsWith('https://spiritdesignsystem.com/') && url.endsWith('?format=md'))).toBe(
      true,
    );
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toEqual(
      expect.arrayContaining([
        'https://spiritdesignsystem.com/introduction?format=md',
        'https://spiritdesignsystem.com/development?format=md',
        'https://spiritdesignsystem.com/development/helpers?format=md',
        'https://spiritdesignsystem.com/development/helpers/links?format=md',
        'https://spiritdesignsystem.com/components?format=md',
        'https://spiritdesignsystem.com/components/button?format=md',
        'https://spiritdesignsystem.com/components/button/design?format=md',
        'https://spiritdesignsystem.com/components/button/react?format=md',
        'https://spiritdesignsystem.com/components/tag/react?format=md',
        'https://spiritdesignsystem.com/icons?format=md',
        'https://spiritdesignsystem.com/helpers?format=md',
      ]),
    );
    expect(urls).not.toContain('https://spiritdesignsystem.com/?format=md');
    expect(urls).not.toContain('https://spiritdesignsystem.com/components/button/web?format=md');
    expect(urls).not.toContain('https://spiritdesignsystem.com/components/button/figma?format=md');
    expect(urls).not.toContain('https://spiritdesignsystem.com/components/tag?format=md');
    expect(urls).not.toContain('https://spiritdesignsystem.com/helpers/clearfix?format=md');

    expect(urls).toEqual(
      expect.arrayContaining([
        'https://spiritdesignsystem.com/introduction?format=md',
        'https://spiritdesignsystem.com/development?format=md',
        'https://spiritdesignsystem.com/development/helpers?format=md',
        'https://spiritdesignsystem.com/development/helpers/links?format=md',
      ]),
    );

    expect(llms).toContain('[Introduction](https://spiritdesignsystem.com/introduction?format=md): Introduction');
    expect(llms).toContain(
      '[Links](https://spiritdesignsystem.com/development/helpers/links?format=md): Link styling sentence.',
    );
    expect(llms).toContain('[Button](https://spiritdesignsystem.com/components/button?format=md): Triggers an action.');
    expect(llms).toContain(
      '[Button — Design](https://spiritdesignsystem.com/components/button/design?format=md): Quiet surface for the design tab.',
    );
    expect(llms).toContain(
      '[Button — React](https://spiritdesignsystem.com/components/button/react?format=md): Triggers an action.',
    );
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

    const icons = pages.find((page) => page.path === '/icons');
    const helpers = pages.find((page) => page.path === '/helpers');

    expect(icons?.body).toContain('- calendar');
    expect(helpers?.body).toContain('- Clearfix');

    expect(full).toContain(
      '### Button — Design\n\nhttps://spiritdesignsystem.com/components/button/design?format=md\n\n# Button\n\nQuiet surface for the design tab.',
    );
    expect(full.split('Quiet surface for the design tab.')).toHaveLength(2);
  });
});

describe('documented pages in this repository', () => {
  it('matches doc slugs, menu landings, icons, and helpers', async () => {
    const pages = await listDocumentedPages();
    const paths = pages.map((page) => page.path);
    const llms = renderLlmsTxt(pages);
    const urls = urlsIn(llms);
    const docSlugs = await listDocSlugs();

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).not.toContain('/');
    expect(paths.some((pagePath) => pagePath.includes('web-preview') || pagePath.includes('react-preview'))).toBe(
      false,
    );
    expect(paths).toEqual(expect.arrayContaining(['/components', '/icons', '/helpers']));

    docSlugs.forEach((slug) => {
      expect(paths).toContain(`/${slug.join('/')}`);
    });

    const failing = urls.filter(
      (url) => !(url.startsWith('https://spiritdesignsystem.com/') && url.endsWith('?format=md')),
    );

    expect(failing).toEqual([]);
    expect(new Set(urls).size).toBe(urls.length);

    const icons = pages.find((page) => page.path === '/icons');
    const helpers = pages.find((page) => page.path === '/helpers');

    fetchAllIcons().forEach((name) => {
      expect(icons?.body).toContain(`- ${name}`);
    });
    fetchAllHelpers().forEach((helper) => {
      expect(helpers?.body).toContain(`- ${helper.title}`);
    });
  });
});
