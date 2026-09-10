import { compileCanonicalSource } from '@local/domains/content/compileCanonicalMdx';
import { readAllowedMarkdown, readCanonicalFile } from '@local/domains/content/contentRepository';
import MarkdownContent from '@local/domains/content/ui/MarkdownContent';
import { notFound } from 'next/navigation';

interface CanonicalMarkdownProps {
  relativePath?: string;
  filePath?: string;
  isCanonical?: boolean;
  missing?: 'empty' | 'not-found';
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
}: CanonicalMarkdownProps) => {
  const raw = await loadMarkdown(relativePath, filePath);

  if (!raw) {
    if (missing === 'not-found') {
      notFound();
    }

    return null;
  }

  const { content } = await compileCanonicalSource(raw, isCanonical || !filePath);

  return <MarkdownContent>{content}</MarkdownContent>;
};

export default CanonicalMarkdown;
