import React from 'react';
import { ComponentCard } from '../ComponentCard';
import { ComponentGrid } from '../ComponentGrid';
import { ComponentsBand } from '../ComponentsBand';

interface AlphabeticalComponentListProps {
  components: string[];
}

const AlphabeticalComponentList = ({ components }: AlphabeticalComponentListProps) => {
  const sorted = [...components].sort();

  return (
    <ComponentsBand variant="grid">
      <ComponentGrid>
        {sorted.map((component) => (
          <ComponentCard key={component} component={component} />
        ))}
      </ComponentGrid>
    </ComponentsBand>
  );
};

export default AlphabeticalComponentList;
