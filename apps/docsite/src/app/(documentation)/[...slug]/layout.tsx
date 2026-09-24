import fs from 'node:fs/promises';
import { Flex, Section } from '@alma-oss/spirit-web-react';
import { isDocSection, isSafeSlug } from '@local/domains/content/constants';
import { slugToDisplayName, titleForSiblingPage } from '@local/domains/content/pageTitle';
import { parseCanonicalFrontmatter } from '@local/domains/content/parseFrontmatter';
import { listSectionNav, resolveCanonicalFile } from '@local/domains/content/repository';
import Cover from '@local/domains/content/ui/Cover';
import Sidebar from '@local/domains/content/ui/Sidebar';
import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';
import styles from './layout.module.scss';

interface DocsSlugLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string[] }>;
}

const DocsSlugLayout = async ({ children, params }: DocsSlugLayoutProps) => {
  const { slug } = await params;

  if (!isSafeSlug(slug) || !isDocSection(slug[0] ?? '')) {
    notFound();
  }

  const currentPath = `/${slug.join('/')}`;
  const section = slug[0] ?? '';
  const nav = await listSectionNav(section);
  const resolved = await resolveCanonicalFile(slug);

  if (!resolved) {
    notFound();
  }

  let title = resolved.title ?? slugToDisplayName(slug.at(-1) ?? section);

  if (!resolved.title && resolved.kind === 'page') {
    const raw = await fs.readFile(resolved.filePath, 'utf8');
    const parsedTitle = parseCanonicalFrontmatter(raw).data.title;
    const leaf = slug.at(-1) ?? section;
    const parent = slug.at(-2) ?? '';

    title = titleForSiblingPage(leaf, parent, parsedTitle || title);
  }

  const crumbs = slug.map((segment, index) => ({
    name: slugToDisplayName(segment),
    href: `/${slug.slice(0, index + 1).join('/')}`,
  }));

  return (
    <>
      <Cover title={title} crumbs={crumbs} />
      <Section size="xlarge">
        <Flex alignmentX="stretch" alignmentY="stretch" spacing="space-1200">
          {nav.length > 0 && <Sidebar nodes={nav} currentPath={currentPath} />}
          <div className={styles.SectionBody}>{children}</div>
        </Flex>
      </Section>
    </>
  );
};

export default DocsSlugLayout;
