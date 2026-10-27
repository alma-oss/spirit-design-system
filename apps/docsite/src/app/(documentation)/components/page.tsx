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

  // The query-state hooks (nuqs) read search params, so this page needs its own Suspense boundary.
  // It is kept here instead of in AppProvider, so that notFound() in nested layouts can still set the 404 status.
  return (
    <Suspense fallback={null}>
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.HEADER}>
        <ComponentsPageHeader />
      </ComponentsBand>
      <Suspense fallback={<ComponentListSkeleton />}>
        <ComponentList components={components} />
      </Suspense>
    </Suspense>
  );
};

export default ComponentsPage;
