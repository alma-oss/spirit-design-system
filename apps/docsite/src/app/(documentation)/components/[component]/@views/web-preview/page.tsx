import { readFile } from 'fs/promises';
import { join } from 'path';
import WebPreviewContent from '@local/domains/components/ui/WebPreviewContent';
import { compilePreview } from '@local/domains/components/utils/compilePreview';
import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { notFound } from 'next/navigation';
import React from 'react';

interface WebPreviewTabProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const WebPreviewTabPage = async ({ params }: WebPreviewTabProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
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

    return <WebPreviewContent html={html} />;
  } catch (error) {
    logError(`[ComponentView] Failed to load Web Preview for "${component}":`, error);

    return null;
  }
};

export default WebPreviewTabPage;
