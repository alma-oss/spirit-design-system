import {
  COMPONENTS_BAND_VARIANTS,
  ComponentList,
  ComponentListSkeleton,
  ComponentsBand,
  ComponentsPageHeader,
} from '@local/domains/components';
import { fetchAllComponents } from '@local/domains/components/repositories/componentsRepository';
import React, { Suspense } from 'react';

const ComponentsPage = () => {
  const components: string[] = fetchAllComponents();

  return (
    <>
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.HEADER}>
        <ComponentsPageHeader />
      </ComponentsBand>
      <Suspense fallback={<ComponentListSkeleton />}>
        <ComponentList components={components} />
      </Suspense>
    </>
  );
};

export default ComponentsPage;
