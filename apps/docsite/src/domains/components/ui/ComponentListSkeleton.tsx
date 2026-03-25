import React from 'react';
import ComponentCardSkeleton from './ComponentCardSkeleton';
import ComponentGrid from './ComponentGrid';

const SKELETON_ITEMS_COUNT = 9;
const SKELETON_ITEMS = Array.from({ length: SKELETON_ITEMS_COUNT }, (_, index) => `component-skeleton-${index}`);

const ComponentListSkeleton = () => (
  <ComponentGrid>
    {SKELETON_ITEMS.map((skeleton) => (
      <ComponentCardSkeleton key={skeleton} />
    ))}
  </ComponentGrid>
);

export default ComponentListSkeleton;
