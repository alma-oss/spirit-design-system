import React from 'react';
import { ComponentCard } from '../../../component-card';
import { fetchComponentsCatalog } from '../../../component-catalog';
import { ComponentGrid } from '../ComponentGrid';
import { ComponentsBand } from '../ComponentsBand';

interface AlphabeticalComponentListProps {
  components: string[];
}

const AlphabeticalComponentList = ({ components }: AlphabeticalComponentListProps) => {
  const catalog = fetchComponentsCatalog([...components].sort());

  return (
    <ComponentsBand variant="grid">
      <ComponentGrid>
        {catalog.map((entry) => (
          <ComponentCard key={entry.name} entry={entry} />
        ))}
      </ComponentGrid>
    </ComponentsBand>
  );
};

export default AlphabeticalComponentList;
