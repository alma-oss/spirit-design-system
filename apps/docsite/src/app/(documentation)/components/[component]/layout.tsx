import ComponentTabNav from '@local/domains/components/ui/ComponentTabNav';
import { getComponentTabAvailability } from '@local/domains/content/repository';
import { type ReactNode } from 'react';

interface ComponentLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const ComponentLayout = async ({ views, params }: ComponentLayoutProps) => {
  const { component } = await params;
  const tabs = await getComponentTabAvailability(component);

  return <ComponentTabNav views={views} component={component} tabs={tabs} />;
};

export default ComponentLayout;
