import ComponentTabNav from '@local/domains/components/ui/ComponentTabNav';
import { getComponentTabAvailability } from '@local/domains/content/repository';
import { type ReactNode } from 'react';

interface ComponentViewsLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const ComponentViewsLayout = async ({ views, params }: ComponentViewsLayoutProps) => {
  const { component } = await params;
  const tabs = await getComponentTabAvailability(component);

  return <ComponentTabNav views={views} component={component} tabs={tabs} />;
};

export default ComponentViewsLayout;
