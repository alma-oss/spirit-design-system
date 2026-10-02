import ComponentTabNavigation from '@local/domains/components/ui/ComponentTabNavigation';
import { type ReactNode } from 'react';

interface ComponentViewsLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const ComponentViewsLayout = async ({ views, params }: ComponentViewsLayoutProps) => {
  const { component } = await params;

  return <ComponentTabNavigation views={views} component={component} />;
};

export default ComponentViewsLayout;
