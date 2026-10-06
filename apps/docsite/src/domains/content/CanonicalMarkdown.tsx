import ComponentBand from '@local/domains/components/ui/ComponentBand';
import { compileCanonicalSource } from '@local/domains/content/compileCanonicalMdx';
import { readAllowedMarkdown, readCanonicalFile } from '@local/domains/content/contentRepository';
import { splitMarkdownSections } from '@local/domains/content/splitMarkdownSections';
import MarkdownContent from '@local/domains/content/ui/MarkdownContent';
import { notFound } from 'next/navigation';

interface CanonicalMarkdownProps {
  relativePath?: string;
  filePath?: string;
  isCanonical?: boolean;
  missing?: 'empty' | 'not-found';
  /** Renders every level 2 section as its own full-width block (component pages). */
  asBlocks?: boolean;
}

const loadMarkdown = async (relativePath: string, filePath: string): Promise<string | null> => {
  if (filePath) {
    return readAllowedMarkdown(filePath);
  }

  if (relativePath) {
    return readCanonicalFile(relativePath);
  }

  return null;
};

const CanonicalMarkdown = async ({
  relativePath = '',
  filePath = '',
  isCanonical = false,
  missing = 'empty',
  asBlocks = false,
}: CanonicalMarkdownProps) => {
  const raw = await loadMarkdown(relativePath, filePath);

  if (!raw) {
    if (missing === 'not-found') {
      notFound();
    }

    return null;
  }

  if (asBlocks) {
    const compiled = await Promise.all(
      splitMarkdownSections(raw).map((block) => compileCanonicalSource(block, isCanonical || !filePath)),
    );

    return (
      <>
        {compiled.map(({ content }, index) => (
          // eslint-disable-next-line react/no-array-index-key -- blocks are static and never reordered
          <ComponentBand key={index}>
            <MarkdownContent>{content}</MarkdownContent>
          </ComponentBand>
        ))}
      </>
    );
  }

  const { content } = await compileCanonicalSource(raw, isCanonical || !filePath);

  return <MarkdownContent>{content}</MarkdownContent>;
};

export default CanonicalMarkdown;
