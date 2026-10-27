import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components';
import { getComponentViewsAvailability } from '@local/domains/components/repositories/componentsRepository';
import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { guardMissingModule } from '@local/domains/components/utils/guardMissingModule';
import { isComponentTabHidden } from '@local/domains/content/componentDocsRepository';
import { componentSegments } from '@local/domains/routing/routes';
import { notFound } from 'next/navigation';
import React from 'react';

interface ReactPreviewTabProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const ReactPreviewTabPage = async ({ params }: ReactPreviewTabProps) => {
  const { component } = await params;

  if (
    !isValidComponentSlug(component) ||
    !getComponentViewsAvailability(component).reactPreview ||
    (await isComponentTabHidden(component, componentSegments.reactPreview))
  ) {
    notFound();
  }

  const componentName = slugToComponentName(component);

  try {
    const { default: Preview } = await import(`@alma-oss/spirit-web-react/components/${componentName}/preview`);

    return (
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.CONTENT}>
        <Preview />
      </ComponentsBand>
    );
  } catch (error) {
    guardMissingModule(error);

    logError(`[ComponentView] Failed to load React Preview for "${component}":`, error);

    throw error;
  }
};

export default ReactPreviewTabPage;
