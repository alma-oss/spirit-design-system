import ComponentGrid from '@local/domains/components/ui/ComponentGrid';
import React from 'react';
import ComponentCard from './ComponentCard';

interface AlphabeticalComponentListProps {
  components: string[];
}

const AlphabeticalComponentList = ({ components }: AlphabeticalComponentListProps) => {
  const sorted = [...components].sort();

  return (
    <ComponentGrid>
      {sorted.map((component) => (
        <ComponentCard key={component} component={component} />
      ))}
    </ComponentGrid>
  );
};

export default AlphabeticalComponentList;
