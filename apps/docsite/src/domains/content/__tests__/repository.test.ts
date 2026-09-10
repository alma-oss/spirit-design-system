import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { getComponentTabAvailability, listDocSlugs, listSectionNav, resolveCanonicalFile } from '../repository';

describe('resolveCanonicalFile', () => {
  it('resolves Folder Landings, sibling pages, and generated indexes', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'canonical-'));

    await fs.mkdir(path.join(root, 'design', 'global-tokens', 'spacing'), { recursive: true });
    await fs.mkdir(path.join(root, 'development', 'helpers'), { recursive: true });
    await fs.writeFile(path.join(root, 'design', 'index.md'), '---\ntitle: Design\n---\n', 'utf8');
    await fs.writeFile(
      path.join(root, 'design', 'global-tokens', 'spacing', 'index.md'),
      '---\ntitle: Spacing\n---\n',
      'utf8',
    );
    await fs.writeFile(
      path.join(root, 'design', 'global-tokens', 'spacing', 'customisation.md'),
      '---\ntitle: Customisation\n---\n',
      'utf8',
    );
    await fs.writeFile(path.join(root, 'development', 'helpers', 'links.md'), '---\ntitle: Helpers\n---\n', 'utf8');
    await fs.writeFile(path.join(root, 'development', 'helpers', 'text.md'), '---\ntitle: Helpers\n---\n', 'utf8');

    await expect(resolveCanonicalFile(['design'], root)).resolves.toEqual({
      kind: 'page',
      filePath: path.join(root, 'design', 'index.md'),
    });
    await expect(resolveCanonicalFile(['design', 'global-tokens', 'spacing'], root)).resolves.toEqual({
      kind: 'page',
      filePath: path.join(root, 'design', 'global-tokens', 'spacing', 'index.md'),
    });
    await expect(resolveCanonicalFile(['design', 'global-tokens', 'spacing', 'customisation'], root)).resolves.toEqual({
      kind: 'page',
      filePath: path.join(root, 'design', 'global-tokens', 'spacing', 'customisation.md'),
    });
    await expect(resolveCanonicalFile(['development'], root)).resolves.toEqual({
      kind: 'generated-index',
      filePath: path.join(root, 'development'),
    });
    await expect(resolveCanonicalFile(['components', 'button'], root)).resolves.toBeNull();

    const slugs = await listDocSlugs(root);

    expect(slugs).toEqual(
      expect.arrayContaining([
        ['design'],
        ['design', 'global-tokens'],
        ['design', 'global-tokens', 'spacing'],
        ['design', 'global-tokens', 'spacing', 'customisation'],
        ['development'],
        ['development', 'helpers'],
        ['development', 'helpers', 'links'],
      ]),
    );
    expect(slugs.some((slug) => slug[0] === 'components')).toBe(false);

    await expect(listSectionNav('development', root)).resolves.toEqual([
      {
        title: 'Helpers',
        href: '/development/helpers',
        children: [
          { title: 'Links', href: '/development/helpers/links' },
          { title: 'Text', href: '/development/helpers/text' },
        ],
      },
    ]);

    await expect(listSectionNav('design', root)).resolves.toEqual([
      {
        title: 'Global Tokens',
        href: '/design/global-tokens',
        children: [
          {
            title: 'Spacing',
            href: '/design/global-tokens/spacing',
            children: [{ title: 'Customisation', href: '/design/global-tokens/spacing/customisation' }],
          },
        ],
      },
    ]);
  });
});

describe('getComponentTabAvailability', () => {
  it('hides Component Tab Pages that are not on disk', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-tabs-'));

    await fs.mkdir(path.join(root, 'components', 'button'), { recursive: true });
    await fs.writeFile(path.join(root, 'components', 'button', 'overview.md'), '---\ntitle: Button\n---\n', 'utf8');
    await fs.writeFile(path.join(root, 'components', 'button', 'design.md'), '---\ntitle: Button\n---\n', 'utf8');

    await expect(getComponentTabAvailability('button', root)).resolves.toEqual({
      overview: true,
      design: true,
      accessibility: false,
      figma: false,
    });
  });
});

describe('repo-backed pages', () => {
  it('resolves migrations and releases from repository markdown', async () => {
    const contentRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'canonical-content-'));
    const repoRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'canonical-repo-'));

    await fs.mkdir(path.join(repoRoot, 'docs', 'migrations', 'web-react'), { recursive: true });
    await fs.mkdir(path.join(repoRoot, 'packages', 'web-react'), { recursive: true });
    await fs.writeFile(path.join(repoRoot, 'docs', 'migrations', 'README.md'), '# Migration Guides\n', 'utf8');
    await fs.writeFile(
      path.join(repoRoot, 'docs', 'migrations', 'web-react', 'migration-v5.md'),
      '# Migration Guide\n',
      'utf8',
    );
    await fs.writeFile(path.join(repoRoot, 'packages', 'web-react', 'CHANGELOG.md'), '# Change Log\n', 'utf8');
    await fs.mkdir(path.join(contentRoot, 'migrations', 'web-react'), { recursive: true });
    await fs.writeFile(path.join(contentRoot, 'migrations', 'index.md'), '---\ntitle: Migrations\n---\n', 'utf8');
    await fs.writeFile(
      path.join(contentRoot, 'migrations', 'web-react', 'migration-to-v5.md'),
      '---\ntitle: Duplicate\n---\n',
      'utf8',
    );

    await expect(resolveCanonicalFile(['migrations'], contentRoot, { repoRoot })).resolves.toEqual({
      kind: 'page',
      filePath: path.join(contentRoot, 'migrations', 'index.md'),
    });
    await expect(
      resolveCanonicalFile(['migrations', 'web-react', 'migration-to-v5'], contentRoot, { repoRoot }),
    ).resolves.toEqual({
      kind: 'page',
      filePath: path.join(repoRoot, 'docs', 'migrations', 'web-react', 'migration-v5.md'),
      title: 'Migration to v5',
    });
    await expect(resolveCanonicalFile(['migrations', 'web-react'], contentRoot, { repoRoot })).resolves.toEqual({
      kind: 'generated-index',
      filePath: path.join(contentRoot, 'migrations', 'web-react'),
    });

    const slugs = await listDocSlugs(contentRoot, { repoRoot });

    expect(slugs).toEqual(
      expect.arrayContaining([
        ['migrations'],
        ['migrations', 'web-react'],
        ['migrations', 'web-react', 'migration-to-v5'],
        ['releases', 'web-react'],
      ]),
    );

    const nav = await listSectionNav('migrations', contentRoot, { repoRoot });

    expect(nav).toEqual(
      expect.arrayContaining([
        {
          title: 'Web React',
          href: '/migrations/web-react',
          children: [{ title: 'Migration to v5', href: '/migrations/web-react/migration-to-v5' }],
        },
      ]),
    );
    expect(nav.some((node) => node.title === 'Duplicate')).toBe(false);
  });
});
