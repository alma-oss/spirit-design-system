import { ComponentHeader } from '@local/domains/components/features/component-detail';
import { ComponentPlayground } from '@local/domains/components/features/component-playground';
import { ComponentTabNavigation } from '@local/domains/components/ui/ComponentTabNavigation';
import { getComponentPageLinks } from '@local/domains/components/ui/PageActions';
import { getComponentDescription, getComponentPlayground } from '@local/domains/content/componentDocs';
import { type ReactNode } from 'react';

interface ComponentViewsLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const ComponentViewsLayout = async ({ views, params }: ComponentViewsLayoutProps) => {
  const { component } = await params;
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
