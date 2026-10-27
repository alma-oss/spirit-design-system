'use client';

import { Text } from '@alma-oss/spirit-web-react';
import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components/ui/ComponentsBand';
import React from 'react';
import type { ComponentCatalogEntry, ComponentCategories } from '../../../component-catalog';
import { filterComponents, useComponentsSearchQueryState } from '../../../component-list-search';
import { SORT_OPTIONS, useComponentsSortQueryState } from '../../../component-list-sort';
import { AlphabeticalComponentList } from '../AlphabeticalComponentList';
import { CategoricalComponentList } from '../CategoricalComponentList';

interface ComponentListProps {
  catalog: ComponentCatalogEntry[];
  categories: ComponentCategories;
}

const ComponentList = ({ catalog, categories }: ComponentListProps) => {
  const [sort] = useComponentsSortQueryState();
  const [query] = useComponentsSearchQueryState();
  const filtered = filterComponents(catalog, query);

  if (filtered.length === 0) {
    // Placeholder until the empty state is designed.
    return (
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.HEADING}>
        <Text elementType="p" size="large" textColor="secondary" marginBottom="space-0" role="status">
          No components found.
        </Text>
      </ComponentsBand>
    );
  }

  return sort === SORT_OPTIONS.CATEGORICAL ? (
    <CategoricalComponentList catalog={filtered} categories={categories} />
  ) : (
    <AlphabeticalComponentList catalog={filtered} />
  );
};

export default ComponentList;
