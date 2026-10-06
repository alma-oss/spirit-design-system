import ComponentTabNav from '@local/domains/components/ui/ComponentTabNav';
import { getComponentTabAvailability } from '@local/domains/content/componentDocs';
import { type ReactNode } from 'react';

interface ComponentViewsLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const ComponentViewsLayout = async ({ views, params }: ComponentViewsLayoutProps) => {
  const { component } = await params;
  const tabs = await getComponentTabAvailability(component);

  return (
    <>
      <ComponentTabNav component={component} tabs={tabs} />
      {views}
    </>
  );
};

export default ComponentViewsLayout;
