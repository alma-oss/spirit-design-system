import ComponentHeader from '@local/domains/components/ui/ComponentHeader';
import ComponentTabNav from '@local/domains/components/ui/ComponentTabNav';
import {
  getComponentDescription,
  getComponentPlayground,
  getComponentTabAvailability,
} from '@local/domains/content/componentDocs';
import ComponentPlayground, { type PlaygroundConfig } from '@local/domains/content/ui/ComponentPlayground';
import { type ReactNode } from 'react';

interface ComponentViewsLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const ComponentViewsLayout = async ({ views, params }: ComponentViewsLayoutProps) => {
  const { component } = await params;
  const [tabs, description, playgroundFile] = await Promise.all([
    getComponentTabAvailability(component),
    getComponentDescription(component),
    getComponentPlayground(component),
  ]);

  const { hiddenTabs = [], ...playground } = playgroundFile ?? {};

  return (
    <>
      <ComponentHeader description={description}>
        {playgroundFile && <ComponentPlayground {...(playground as PlaygroundConfig)} />}
      </ComponentHeader>
      <ComponentTabNav component={component} tabs={tabs} hiddenTabs={hiddenTabs} />
      {views}
    </>
  );
};

export default ComponentViewsLayout;
