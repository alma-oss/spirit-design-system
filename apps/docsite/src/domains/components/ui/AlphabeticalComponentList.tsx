import React from 'react';
import ComponentCard from './ComponentCard';
import ComponentGrid from './ComponentGrid';
import ComponentsBand from './ComponentsBand';

interface AlphabeticalComponentListProps {
  components: string[];
  previews: Record<string, string>;
}

const AlphabeticalComponentList = ({ components, previews }: AlphabeticalComponentListProps) => {
  const sorted = [...components].sort();

  return (
    <ComponentsBand variant="grid">
      <ComponentGrid>
        {sorted.map((component) => (
          <ComponentCard key={component} component={component} previewHtml={previews[component]} />
        ))}
      </ComponentGrid>
    </ComponentsBand>
  );
};

export default AlphabeticalComponentList;
