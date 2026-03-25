'use client';

import { SORT_OPTIONS } from '@local/domains/components/constants/componentCategories';
import { useComponentsSortQueryState } from '@local/domains/components/hooks/useComponentsSortQueryState';
import AlphabeticalComponentList from '@local/domains/components/ui/AlphabeticalComponentList';
import CategoricalComponentList from '@local/domains/components/ui/CategoricalComponentList';
import React from 'react';

interface ComponentListProps {
  components: string[];
}

const ComponentList = ({ components }: ComponentListProps) => {
  const [sort] = useComponentsSortQueryState();

  return sort === SORT_OPTIONS.CATEGORICAL ? (
    <CategoricalComponentList components={components} />
  ) : (
    <AlphabeticalComponentList components={components} />
  );
};

export default ComponentList;
