import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components/ui/ComponentsBand';
import React from 'react';
import { ComponentCardSkeleton } from '../../../component-card';
import { ComponentGrid } from '../ComponentGrid';

const SKELETON_ITEMS_COUNT = 9;
const SKELETON_ITEMS = Array.from({ length: SKELETON_ITEMS_COUNT }, (_, index) => `component-skeleton-${index}`);

const ComponentListSkeleton = () => (
  <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.GRID}>
    <ComponentGrid>
      {SKELETON_ITEMS.map((skeleton) => (
        <ComponentCardSkeleton key={skeleton} />
      ))}
    </ComponentGrid>
  </ComponentsBand>
);

export default ComponentListSkeleton;
