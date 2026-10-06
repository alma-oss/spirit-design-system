import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { getComponentTabAvailability, isComponentTabHidden, resolveComponentTabFile } from '../componentDocs';

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
