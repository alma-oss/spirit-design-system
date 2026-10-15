import { ComponentList, ComponentListSkeleton, ComponentsBand, ComponentsPageHeader } from '@local/domains/components';
import { fetchAllComponents } from '@local/domains/components/repositories/componentsRepository';
import React, { Suspense } from 'react';

const ComponentsPage = () => {
  const components: string[] = fetchAllComponents();

  return (
    <>
      <ComponentsBand variant="header">
        <ComponentsPageHeader />
      </ComponentsBand>
      <Suspense fallback={<ComponentListSkeleton />}>
        <ComponentList components={components} />
      </Suspense>
    </>
  );
};

export default ComponentsPage;
