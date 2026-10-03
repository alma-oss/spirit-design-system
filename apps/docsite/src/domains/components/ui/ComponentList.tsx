'use client';

import { SORT_OPTIONS } from '@local/domains/components/constants/componentCategories';
import { useComponentsSortQueryState } from '@local/domains/components/hooks/useComponentsSortQueryState';
import AlphabeticalComponentList from '@local/domains/components/ui/AlphabeticalComponentList';
import CategoricalComponentList from '@local/domains/components/ui/CategoricalComponentList';
import React from 'react';

interface ComponentListProps {
  components: string[];
  previews: Record<string, string>;
}

const ComponentList = ({ components, previews }: ComponentListProps) => {
  const [sort] = useComponentsSortQueryState();

  return sort === SORT_OPTIONS.CATEGORICAL ? (
    <CategoricalComponentList components={components} previews={previews} />
  ) : (
    <AlphabeticalComponentList components={components} previews={previews} />
  );
};

export default ComponentList;
