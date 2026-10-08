import React from 'react';
import ComponentCardSkeleton from './ComponentCardSkeleton';
import ComponentGrid from './ComponentGrid';
import ComponentsBand from './ComponentsBand';

const SKELETON_ITEMS_COUNT = 9;
const SKELETON_ITEMS = Array.from({ length: SKELETON_ITEMS_COUNT }, (_, index) => `component-skeleton-${index}`);

const ComponentListSkeleton = () => (
  <ComponentsBand variant="grid">
    <ComponentGrid>
      {SKELETON_ITEMS.map((skeleton) => (
        <ComponentCardSkeleton key={skeleton} />
      ))}
    </ComponentGrid>
  </ComponentsBand>
);

export default ComponentListSkeleton;
