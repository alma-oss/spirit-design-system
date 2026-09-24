import { compileCanonicalSource } from '@local/domains/content/compileCanonicalMdx';
import { prepareMarkdownSource } from '@local/domains/content/prepareMarkdownSource';
import { readAllowedMarkdown, readCanonicalFile } from '@local/domains/content/repository';
import { notFound } from 'next/navigation';
import styles from './CanonicalMarkdown.module.scss';

interface CanonicalMarkdownProps {
  relativePath?: string;
  filePath?: string;
  isCanonical?: boolean;
  missing?: 'empty' | 'not-found';
}

const loadMarkdown = async (relativePath: string, filePath: string, isCanonical: boolean): Promise<string | null> => {
  if (filePath) {
    const raw = await readAllowedMarkdown(filePath);

    if (!raw) {
      return null;
    }

    return prepareMarkdownSource(raw, isCanonical);
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
  const raw = await loadMarkdown(relativePath, filePath, isCanonical);

  if (!raw) {
    if (missing === 'not-found') {
      notFound();
    }

    return null;
  }

  const { content } = await compileCanonicalSource(raw);

  return <div className={styles.markdown}>{content}</div>;
};

export default CanonicalMarkdown;
