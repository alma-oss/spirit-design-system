import ComponentBand from '@local/domains/components/ui/ComponentBand';
import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { isComponentTabHidden } from '@local/domains/content/componentDocs';
import { componentSegments } from '@local/domains/routing/routes';
import { notFound } from 'next/navigation';
import React from 'react';

interface ReactPreviewTabProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const ReactPreviewTabPage = async ({ params }: ReactPreviewTabProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component) || (await isComponentTabHidden(component, componentSegments.reactPreview))) {
    notFound();
  }

  const componentName = slugToComponentName(component);

  try {
    const { default: Preview } = await import(`@alma-oss/spirit-web-react/components/${componentName}/preview`);

    return (
      <ComponentBand>
        <Preview />
      </ComponentBand>
    );
  } catch (error) {
    logError(`[ComponentView] Failed to load React Preview for "${component}":`, error);

    return null;
  }
};

export default ReactPreviewTabPage;
