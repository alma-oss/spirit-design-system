import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components';
import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { isMissingModuleError } from '@local/domains/components/utils/isMissingModuleError';
import { compileCanonicalSource } from '@local/domains/content/compileCanonicalMdx';
import MarkdownContent from '@local/domains/content/ui/MarkdownContent';
import { componentBlockHeadingComponents } from '@local/mdx-components';
import { notFound } from 'next/navigation';

interface ReactTabProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const ReactTabPage = async ({ params }: ReactTabProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  try {
    const source = await readFile(
      join(process.cwd(), '../../packages/web-react/src/components', slugToComponentName(component), 'README.md'),
      'utf8',
    );
    const { content } = await compileCanonicalSource(source, false, componentBlockHeadingComponents);

    return (
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.CONTENT}>
        <MarkdownContent>{content}</MarkdownContent>
      </ComponentsBand>
    );
  } catch (error) {
    if (isMissingModuleError(error)) {
      notFound();
    }

    logError(`[ComponentView] Failed to load React README for "${component}":`, error);

    throw error;
  }
};

export default ReactTabPage;
