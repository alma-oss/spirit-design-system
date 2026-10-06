import { readFile } from 'fs/promises';
import { join } from 'path';
import ComponentBand from '@local/domains/components/ui/ComponentBand';
import WebPreview from '@local/domains/components/ui/WebPreview';
import { compilePreview } from '@local/domains/components/utils/compilePreview';
import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { isComponentTabHidden } from '@local/domains/content/componentDocs';
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
      <ComponentBand>
        <WebPreview html={html} />
      </ComponentBand>
    );
  } catch (error) {
    logError(`[ComponentView] Failed to load Web Preview for "${component}":`, error);

    return null;
  }
};

export default WebPreviewTabPage;
