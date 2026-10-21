'use client';

import { Text } from '@alma-oss/spirit-web-react';
import React from 'react';
import { filterComponents, useComponentsSearchQueryState } from '../../../component-list-search';
import { SORT_OPTIONS, useComponentsSortQueryState } from '../../../component-list-sort';
import { AlphabeticalComponentList } from '../AlphabeticalComponentList';
import { CategoricalComponentList } from '../CategoricalComponentList';
import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '../ComponentsBand';

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
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.HEADING}>
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
