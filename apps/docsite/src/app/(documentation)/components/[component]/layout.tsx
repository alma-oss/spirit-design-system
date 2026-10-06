import { ComponentCover } from '@local/domains/components/ui/ComponentCover';
import { ComponentTabNavigation } from '@local/domains/components/ui/ComponentTabNavigation';
import { type ReactNode } from 'react';

interface ComponentViewsLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const ComponentViewsLayout = async ({ views, params }: ComponentViewsLayoutProps) => {
  const { component } = await params;

  return (
    <>
      <ComponentCover />
      <ComponentTabNavigation component={component} />
      {views}
    </>
  );
};

export default ComponentViewsLayout;
