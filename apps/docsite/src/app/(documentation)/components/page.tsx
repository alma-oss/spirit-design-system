import { fetchCardPreviews } from '@local/domains/components/repositories/cardPreviewsRepository';
import { fetchAllComponents } from '@local/domains/components/repositories/componentsRepository';
import ComponentList from '@local/domains/components/ui/ComponentList';
import ComponentListSkeleton from '@local/domains/components/ui/ComponentListSkeleton';
import ComponentsBand from '@local/domains/components/ui/ComponentsBand';
import ComponentsPageHeader from '@local/domains/components/ui/ComponentsPageHeader';
import React, { Suspense } from 'react';

const ComponentsPage = () => {
  const components: string[] = fetchAllComponents();
  const previews = fetchCardPreviews(components);

  return (
    <>
      <ComponentsBand variant="header">
        <ComponentsPageHeader />
      </ComponentsBand>
      <Suspense fallback={<ComponentListSkeleton />}>
        <ComponentList components={components} previews={previews} />
      </Suspense>
    </>
  );
};

export default ComponentsPage;
