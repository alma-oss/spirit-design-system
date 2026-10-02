import ComponentTabNav from '@local/domains/components/ui/ComponentTabNav';
import { type ReactNode } from 'react';

interface ComponentViewsLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const ComponentViewsLayout = async ({ views, params }: ComponentViewsLayoutProps) => {
  const { component } = await params;

  return <ComponentTabNav views={views} component={component} />;
};

export default ComponentViewsLayout;
