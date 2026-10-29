import { ComponentHeader } from '@local/domains/components/features/component-detail';
import { ComponentPlayground, getComponentPlayground } from '@local/domains/components/features/component-playground';
import {
  fetchAllComponents,
  getComponentViewsAvailability,
} from '@local/domains/components/repositories/componentsRepository';
import { ComponentTabNavigation } from '@local/domains/components/ui/ComponentTabNavigation';
import { getComponentPageLinks } from '@local/domains/components/ui/PageActions';
import { componentNameToSlug, isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import { getComponentDescription } from '@local/domains/content/componentDocsRepository';
import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';

interface ComponentViewsLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const ComponentViewsLayout = async ({ views, params }: ComponentViewsLayoutProps) => {
  const { component } = await params;

  if (
    !isValidComponentSlug(component) ||
    (!fetchAllComponents().map(componentNameToSlug).includes(component) &&
      !Object.values(getComponentViewsAvailability(component)).some(Boolean))
  ) {
    notFound();
  }

  const [description, playgroundFile] = await Promise.all([
    getComponentDescription(component),
    getComponentPlayground(component),
  ]);

  return (
    <>
      <ComponentHeader description={description} links={getComponentPageLinks(component, playgroundFile)}>
        {playgroundFile && (
          <ComponentPlayground
            component={playgroundFile.component}
            controls={playgroundFile.controls}
            storybookUrl={playgroundFile.storybookUrl}
            figmaUrl={playgroundFile.figmaUrl}
          />
        )}
      </ComponentHeader>
      <ComponentTabNavigation component={component} hiddenTabs={playgroundFile?.hiddenTabs} />
      {views}
    </>
  );
};

export default ComponentViewsLayout;
