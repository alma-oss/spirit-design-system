import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components';
import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { compileCanonicalSource } from '@local/domains/content/compileCanonicalMdx';
import MarkdownContent from '@local/domains/content/ui/MarkdownContent';
import { componentBlockHeadingComponents } from '@local/mdx-components';
import { notFound } from 'next/navigation';

interface WebTabPageProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const WebTabPage = async ({ params }: WebTabPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  try {
    const source = await readFile(
      join(process.cwd(), '../../packages/web/src/scss/components', slugToComponentName(component), 'README.md'),
      'utf8',
    );
    const { content } = await compileCanonicalSource(source, false, componentBlockHeadingComponents);

    return (
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.CONTENT}>
        <MarkdownContent>{content}</MarkdownContent>
      </ComponentsBand>
    );
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT') {
      logError(`[ComponentView] Failed to load Web README for "${component}":`, error);

      return null;
    }

    throw error;
  }
};

export default WebTabPage;
