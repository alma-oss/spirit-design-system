'use client';

import { Text } from '@alma-oss/spirit-web-react';
import React from 'react';
import AlphabeticalComponentList from './AlphabeticalComponentList';
import CategoricalComponentList from './CategoricalComponentList';
import ComponentsBand from './ComponentsBand';
import { useComponentsSearchQueryState } from './hooks/useComponentsSearchQueryState';
import { useComponentsSortQueryState } from './hooks/useComponentsSortQueryState';
import { SORT_OPTIONS } from './model/componentCategories';
import { filterComponents } from './utils/filterComponents';

interface ComponentListProps {
  components: string[];
}

const ComponentList = ({ components }: ComponentListProps) => {
  const [sort] = useComponentsSortQueryState();
  const [query] = useComponentsSearchQueryState();
  const filtered = filterComponents(components, query);

  if (filtered.length === 0) {
    // Placeholder until the empty state is designed.
    return (
      <ComponentsBand variant="heading">
        <Text elementType="p" size="large" textColor="secondary" marginBottom="space-0" role="status">
          No components found.
        </Text>
      </ComponentsBand>
    );
  }

  return sort === SORT_OPTIONS.CATEGORICAL ? (
    <CategoricalComponentList components={filtered} />
  ) : (
    <AlphabeticalComponentList components={filtered} />
  );
};

export default ComponentList;
