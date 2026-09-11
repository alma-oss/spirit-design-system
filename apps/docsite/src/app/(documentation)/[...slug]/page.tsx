import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { listDocSlugs, listSectionNav, resolveCanonicalFile, type NavNode } from '@local/domains/content/repository';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';

interface DocsSlugPageProps {
  params: Promise<{ slug: string[] }>;
}

const findNavNode = (nodes: NavNode[], href: string): NavNode | undefined => {
  for (const node of nodes) {
    if (node.href === href) {
      return node;
    }

    if (node.children) {
      const found = findNavNode(node.children, href);

      if (found) {
        return found;
      }
    }
  }

  return undefined;
};

const GeneratedIndex = ({ nodes }: { nodes: NavNode[] }) => (
  <div className="docs-Markdown">
    <ul>
      {nodes.map((node) => (
        <li key={node.href}>
          <NextLink href={node.href}>{node.title}</NextLink>
        </li>
      ))}
    </ul>
  </div>
);

const DocsSlugPage = async ({ params }: DocsSlugPageProps) => {
  const { slug } = await params;
  const resolved = await resolveCanonicalFile(slug);

  if (!resolved) {
    notFound();
  }

  if (resolved.kind === 'generated-index') {
    const sectionNav = await listSectionNav(slug[0] ?? '');
    const href = `/${slug.join('/')}`;
    const nodes = slug.length === 1 ? sectionNav : (findNavNode(sectionNav, href)?.children ?? []);

    return <GeneratedIndex nodes={nodes} />;
  }

  return <CanonicalMarkdown missing="not-found" filePath={resolved.filePath} />;
};

// eslint-disable-next-line react-refresh/only-export-components -- Next.js static params belong on the page module
export const generateStaticParams = async () => {
  const slugs = await listDocSlugs();

  return slugs.map((slug) => ({ slug }));
};

export default DocsSlugPage;
