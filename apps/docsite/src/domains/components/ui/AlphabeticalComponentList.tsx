import ComponentGrid from '@local/domains/components/ui/ComponentGrid';
import React from 'react';
import ComponentCard from './ComponentCard';

interface AlphabeticalComponentListProps {
  components: string[];
  previews: Record<string, string>;
}

const AlphabeticalComponentList = ({ components, previews }: AlphabeticalComponentListProps) => {
  const sorted = [...components].sort();

  return (
    <ComponentGrid>
      {sorted.map((component) => (
        <ComponentCard key={component} component={component} previewHtml={previews[component]} />
      ))}
    </ComponentGrid>
  );
};

export default AlphabeticalComponentList;
