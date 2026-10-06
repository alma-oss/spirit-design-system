import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  DOCSITE_FIGMA_URL,
  DOCSITE_STORYBOOK_URL,
  getComponentPageLinks,
} from '@local/domains/components/ui/PageActions/pageLinks';
import {
  getComponentDescription,
  getComponentTabAvailability,
  isComponentTabHidden,
  resolveComponentTabFile,
} from '../componentDocsRepository';

describe('getComponentTabAvailability', () => {
  it('hides Component Tab Pages that are not on disk', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-tabs-'));

    const docsDir = path.join(root, 'packages/web-react/src/components/Button/docs');

    await fs.mkdir(docsDir, { recursive: true });
    await fs.writeFile(path.join(docsDir, 'overview.md'), '---\ntitle: Button\n---\n', 'utf8');
    await fs.writeFile(path.join(docsDir, 'design.md'), '---\ntitle: Button\n---\n', 'utf8');

    await expect(getComponentTabAvailability('button', root)).resolves.toEqual({
      overview: true,
      design: true,
      accessibility: false,
      figma: false,
    });
  });

  it('hides the Figma tab when the component playground links to Figma', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-tabs-'));
    const docsDir = path.join(root, 'packages/web-react/src/components/Button/docs');

    await fs.mkdir(docsDir, { recursive: true });
    await fs.writeFile(path.join(docsDir, 'figma.md'), '---\ntitle: Button\n---\n', 'utf8');

    await expect(getComponentTabAvailability('button', root)).resolves.toMatchObject({ figma: true });

    await fs.writeFile(
      path.join(docsDir, 'playground.json'),
      JSON.stringify({ component: 'Button', controls: [], figmaUrl: 'https://www.figma.com/design/abc' }),
      'utf8',
    );

    await expect(getComponentTabAvailability('button', root)).resolves.toMatchObject({ figma: false });
  });

  it('keeps the Figma tab when the playground has no Figma link', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-tabs-'));
    const docsDir = path.join(root, 'packages/web-react/src/components/Button/docs');

    await fs.mkdir(docsDir, { recursive: true });
    await fs.writeFile(path.join(docsDir, 'figma.md'), '---\ntitle: Button\n---\n', 'utf8');
    await fs.writeFile(
      path.join(docsDir, 'playground.json'),
      JSON.stringify({ component: 'Button', controls: [] }),
      'utf8',
    );

    await expect(getComponentTabAvailability('button', root)).resolves.toMatchObject({ figma: true });
  });

  it('resolves stable and unstable component tabs from colocated docs', () => {
    const root = path.join(os.tmpdir(), 'component-tabs');

    expect(resolveComponentTabFile('file-upload', 'overview', root)).toBe(
      path.join(root, 'packages/web-react/src/components/FileUpload/docs/overview.md'),
    );
    expect(resolveComponentTabFile('unstable-combobox', 'accessibility', root)).toBe(
      path.join(root, 'packages/web-react/src/components/UNSTABLE_Combobox/docs/accessibility.md'),
    );
    expect(resolveComponentTabFile('../button', 'overview', root)).toBeNull();
  });
});

describe('isComponentTabHidden', () => {
  it('hides only the tabs listed in the component playground', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-tabs-'));
    const docsDir = path.join(root, 'packages/web-react/src/components/Button/docs');

    await fs.mkdir(docsDir, { recursive: true });
    await fs.writeFile(
      path.join(docsDir, 'playground.json'),
      JSON.stringify({ component: 'Button', controls: [], hiddenTabs: ['web-preview'] }),
      'utf8',
    );

    await expect(isComponentTabHidden('button', 'web-preview', root)).resolves.toBe(true);
    await expect(isComponentTabHidden('button', 'react-preview', root)).resolves.toBe(false);
  });

  it('hides nothing for a component without a playground', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-tabs-'));

    await expect(isComponentTabHidden('accordion', 'web-preview', root)).resolves.toBe(false);
  });
});

describe('getComponentDescription', () => {
  const writeReadme = async (markdown: string) => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-description-'));
    const componentDir = path.join(root, 'packages/web-react/src/components/Button');

    await fs.mkdir(componentDir, { recursive: true });
    await fs.writeFile(path.join(componentDir, 'README.md'), markdown, 'utf8');

    return root;
  };

  it('returns the first sentence under the readme title', async () => {
    const root = await writeReadme(
      '# Button\n\nButton allows users to [take actions](/docs). More text.\n\n## Usage\n',
    );

    await expect(getComponentDescription('button', root)).resolves.toBe('Button allows users to take actions.');
  });

  it('returns an empty string when the readme is missing', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-description-'));

    await expect(getComponentDescription('button', root)).resolves.toBe('');
  });

  it('ignores a fenced example once the readme has already opened a section', async () => {
    const root = await writeReadme(
      '# Accordion\n\n## Usage\n\n```tsx\nexport const Example = () => {\n\n  return null;\n};\n```\n',
    );

    await expect(getComponentDescription('button', root)).resolves.toBe('');
  });

  it('removes a reference link from the intro', async () => {
    const root = await writeReadme(
      '# Stack\n\n[Stack][stack] is a component that allows you to compose elements vertically.\n\n[stack]: https://example.com\n',
    );

    await expect(getComponentDescription('button', root)).resolves.toBe(
      'Stack is a component that allows you to compose elements vertically.',
    );
  });

  it('skips an unstable warning and uses the next paragraph', async () => {
    const root = await writeReadme(
      '# Combobox\n\n⚠️ This component is **UNSTABLE**. Its API may change.\n\nCombobox is a form control built on [Dropdown][dropdown].\n',
    );

    await expect(getComponentDescription('button', root)).resolves.toBe(
      'Combobox is a form control built on Dropdown.',
    );
  });
});

describe('getComponentPageLinks', () => {
  it('uses the playground urls and the component folder on GitHub', () => {
    expect(
      getComponentPageLinks('button', {
        storybookUrl: 'https://example.com/storybook',
        figmaUrl: 'https://example.com/figma',
      }),
    ).toEqual([
      { label: 'Open in Storybook', href: 'https://example.com/storybook' },
      {
        label: 'Open on GitHub',
        href: 'https://github.com/alma-oss/spirit-design-system/tree/main/packages/web-react/src/components/Button',
      },
      { label: 'Open in Figma', href: 'https://example.com/figma' },
    ]);
  });

  it('falls back to the listing urls', () => {
    expect(getComponentPageLinks('button')).toEqual([
      { label: 'Open in Storybook', href: DOCSITE_STORYBOOK_URL },
      {
        label: 'Open on GitHub',
        href: 'https://github.com/alma-oss/spirit-design-system/tree/main/packages/web-react/src/components/Button',
      },
      { label: 'Open in Figma', href: DOCSITE_FIGMA_URL },
    ]);
  });
});
