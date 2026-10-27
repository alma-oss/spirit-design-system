import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components/ui/ComponentsBand';
import React from 'react';
import { ComponentCard } from '../../../component-card';
import type { ComponentCatalogEntry } from '../../../component-catalog';
import { ComponentGrid } from '../ComponentGrid';

interface AlphabeticalComponentListProps {
  catalog: ComponentCatalogEntry[];
}

const AlphabeticalComponentList = ({ catalog }: AlphabeticalComponentListProps) => {
  const sorted = [...catalog].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.GRID}>
      <ComponentGrid>
        {sorted.map((entry) => (
          <ComponentCard key={entry.name} entry={entry} />
        ))}
      </ComponentGrid>
    </ComponentsBand>
  );
};

export default AlphabeticalComponentList;
