import { compileCanonicalSource } from '@local/domains/content/compileCanonicalMdx';
import { escapeMdxPunctuation } from '@local/domains/content/escapeMdxPunctuation';
import { getContentRoot, isPathInside } from '@local/domains/content/paths';
import { readAllowedMarkdown, readCanonicalFile } from '@local/domains/content/repository';
import { notFound } from 'next/navigation';

interface CanonicalMarkdownProps {
  relativePath?: string;
  filePath?: string;
  missing?: 'empty' | 'not-found';
}

const loadMarkdown = async (relativePath: string, filePath: string): Promise<string | null> => {
  if (filePath) {
    const raw = await readAllowedMarkdown(filePath);

    if (!raw) {
      return null;
    }

    return isPathInside(filePath, getContentRoot()) ? raw : escapeMdxPunctuation(raw);
  }

  if (relativePath) {
    return readCanonicalFile(relativePath);
  }

  return null;
};

const CanonicalMarkdown = async ({ relativePath = '', filePath = '', missing = 'empty' }: CanonicalMarkdownProps) => {
  const raw = await loadMarkdown(relativePath, filePath);

  if (!raw) {
    if (missing === 'not-found') {
      notFound();
    }

    return null;
  }

  const { content } = await compileCanonicalSource(raw);

  return <div className="docs-Markdown">{content}</div>;
};

export default CanonicalMarkdown;
