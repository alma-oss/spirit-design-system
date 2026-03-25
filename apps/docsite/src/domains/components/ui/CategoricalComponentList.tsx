import { Heading, Section } from '@alma-oss/spirit-web-react';
import ComponentGrid from '@local/domains/components/ui/ComponentGrid';
import { groupComponentsByCategory } from '@local/domains/components/utils/groupComponentsByCategory';
import React from 'react';
import ComponentCard from './ComponentCard';

interface CategoricalComponentListProps {
  components: string[];
}

const CategoricalComponentList = ({ components }: CategoricalComponentListProps) => {
  const categories = groupComponentsByCategory(components);

  return categories.map(({ category, components: filtered }) => (
    <Section key={category} marginBottom="space-1200" hasContainer={false}>
      <Heading elementType="h2" marginBottom="space-800">
        {category}
      </Heading>
      <ComponentGrid>
        {filtered.map((component) => (
          <ComponentCard key={component} component={component} />
        ))}
      </ComponentGrid>
    </Section>
  ));
};

export default CategoricalComponentList;
