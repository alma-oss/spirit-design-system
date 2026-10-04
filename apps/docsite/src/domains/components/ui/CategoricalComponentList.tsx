import { Heading, Section, Text } from '@alma-oss/spirit-web-react';
import { COMPONENT_CATEGORY_DESCRIPTIONS } from '@local/domains/components/constants/componentCategories';
import ComponentGrid from '@local/domains/components/ui/ComponentGrid';
import { groupComponentsByCategory } from '@local/domains/components/utils/groupComponentsByCategory';
import React from 'react';
import ComponentCard from './ComponentCard';

interface CategoricalComponentListProps {
  components: string[];
  previews: Record<string, string>;
}

const CategoricalComponentList = ({ components, previews }: CategoricalComponentListProps) => {
  const categories = groupComponentsByCategory(components);

  return categories.map(({ category, components: filtered }) => (
    <Section key={category} marginBottom="space-1200" hasContainer={false}>
      <Heading elementType="h2" marginBottom={COMPONENT_CATEGORY_DESCRIPTIONS[category] ? 'space-400' : 'space-800'}>
        {category}
      </Heading>
      {COMPONENT_CATEGORY_DESCRIPTIONS[category] && (
        <Text elementType="p" marginBottom="space-800" UNSAFE_style={{ maxWidth: '60ch' }}>
          {COMPONENT_CATEGORY_DESCRIPTIONS[category]}
        </Text>
      )}
      <ComponentGrid>
        {filtered.map((component) => (
          <ComponentCard key={component} component={component} previewHtml={previews[component]} />
        ))}
      </ComponentGrid>
    </Section>
  ));
};

export default CategoricalComponentList;
