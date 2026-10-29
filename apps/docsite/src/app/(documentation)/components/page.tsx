import {
  COMPONENTS_BAND_VARIANTS,
  ComponentList,
  ComponentListSkeleton,
  ComponentsBand,
  ComponentsPageHeader,
} from '@local/domains/components';
import { fetchAllComponents } from '@local/domains/components/repositories/componentsRepository';
import { fetchComponentCategories } from '@local/domains/components/repositories/componentsSchemaRepository';
import React, { Suspense } from 'react';

const ComponentsPage = () => {
  const components: string[] = fetchAllComponents();
  const categories = fetchComponentCategories();

  return (
    <>
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.HEADER}>
        <ComponentsPageHeader />
      </ComponentsBand>
      <Suspense fallback={<ComponentListSkeleton />}>
        <ComponentList components={components} categories={categories} />
      </Suspense>
    </>
  );
};

export default ComponentsPage;
