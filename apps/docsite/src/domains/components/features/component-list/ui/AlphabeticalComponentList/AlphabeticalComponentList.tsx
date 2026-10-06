import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components/ui/ComponentsBand';
import React from 'react';
import { ComponentCard } from '../../../component-card';
import { fetchComponentsCatalog } from '../../../component-catalog';
import { ComponentGrid } from '../ComponentGrid';

interface AlphabeticalComponentListProps {
  components: string[];
}

const AlphabeticalComponentList = ({ components }: AlphabeticalComponentListProps) => {
  const catalog = fetchComponentsCatalog([...components].sort());

  return (
    <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.GRID}>
      <ComponentGrid>
        {catalog.map((entry) => (
          <ComponentCard key={entry.name} entry={entry} />
        ))}
      </ComponentGrid>
    </ComponentsBand>
  );
};

export default AlphabeticalComponentList;
