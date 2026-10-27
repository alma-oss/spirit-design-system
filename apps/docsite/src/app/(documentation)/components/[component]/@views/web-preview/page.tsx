import { readFile } from 'fs/promises';
import { join } from 'path';
import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components';
import { WebPreview } from '@local/domains/components/ui/WebPreview';
import { compilePreview } from '@local/domains/components/utils/compilePreview';
import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { isMissingModuleError } from '@local/domains/components/utils/isMissingModuleError';
import { isComponentTabHidden } from '@local/domains/content/componentDocsRepository';
import { componentSegments } from '@local/domains/routing/routes';
import { notFound } from 'next/navigation';
import React from 'react';

interface WebPreviewTabProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const WebPreviewTabPage = async ({ params }: WebPreviewTabProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component) || (await isComponentTabHidden(component, componentSegments.webPreview))) {
    notFound();
  }

  try {
    const previewPath = join(
      process.cwd(),
      '../../packages/web/src/scss/components',
      slugToComponentName(component),
      'preview.html',
    );
    const source = await readFile(previewPath, 'utf-8');
    const html = compilePreview(source);

    return (
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.CONTENT}>
        <WebPreview html={html} />
      </ComponentsBand>
    );
  } catch (error) {
    if (isMissingModuleError(error)) {
      notFound();
    }

    logError(`[ComponentView] Failed to load Web Preview for "${component}":`, error);

    throw error;
  }
};

export default WebPreviewTabPage;
