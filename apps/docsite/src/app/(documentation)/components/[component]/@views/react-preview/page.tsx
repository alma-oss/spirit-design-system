import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { notFound } from 'next/navigation';
import React from 'react';

interface ReactPreviewTabProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const ReactPreviewTabPage = async ({ params }: ReactPreviewTabProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  const componentName = slugToComponentName(component);

  try {
    const { default: Preview } = await import(`@workspace/web-react/components/${componentName}/preview`);

    return <Preview />;
  } catch (error) {
    logError(`[ComponentView] Failed to load React Preview for "${component}":`, error);

    return null;
  }
};

export default ReactPreviewTabPage;
