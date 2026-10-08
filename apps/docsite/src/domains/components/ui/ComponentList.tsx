'use client';

import { Text } from '@alma-oss/spirit-web-react';
import { SORT_OPTIONS } from '@local/domains/components/constants/componentCategories';
import { useComponentsSearchQueryState } from '@local/domains/components/hooks/useComponentsSearchQueryState';
import { useComponentsSortQueryState } from '@local/domains/components/hooks/useComponentsSortQueryState';
import AlphabeticalComponentList from '@local/domains/components/ui/AlphabeticalComponentList';
import CategoricalComponentList from '@local/domains/components/ui/CategoricalComponentList';
import ComponentsBand from '@local/domains/components/ui/ComponentsBand';
import { filterComponents } from '@local/domains/components/utils/filterComponents';
import React from 'react';

interface ComponentListProps {
  components: string[];
  previews: Record<string, string>;
}

const ComponentList = ({ components, previews }: ComponentListProps) => {
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
    <CategoricalComponentList components={filtered} previews={previews} />
  ) : (
    <AlphabeticalComponentList components={filtered} previews={previews} />
  );
};

export default ComponentList;
