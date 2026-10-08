import { Heading, Text } from '@alma-oss/spirit-web-react';
import { COMPONENT_CATEGORY_DESCRIPTIONS } from '@local/domains/components/constants/componentCategories';
import { groupComponentsByCategory } from '@local/domains/components/utils/groupComponentsByCategory';
import React from 'react';
import ComponentCard from './ComponentCard';
import ComponentGrid from './ComponentGrid';
import ComponentsBand from './ComponentsBand';

interface CategoricalComponentListProps {
  components: string[];
  previews: Record<string, string>;
}

const CategoricalComponentList = ({ components, previews }: CategoricalComponentListProps) => {
  const categories = groupComponentsByCategory(components);

  return categories.map(({ category, components: filtered }) => (
    <React.Fragment key={category}>
      <ComponentsBand variant="heading">
        <div style={{ maxWidth: '37rem' }}>
          <Heading elementType="h2" size="small" fontWeight="semibold" marginBottom="space-700">
            {category}
          </Heading>
          {COMPONENT_CATEGORY_DESCRIPTIONS[category] && (
            <Text elementType="p" size="large" textColor="secondary" marginBottom="space-0">
              {COMPONENT_CATEGORY_DESCRIPTIONS[category]}
            </Text>
          )}
        </div>
      </ComponentsBand>
      <ComponentsBand variant="grid">
        <ComponentGrid>
          {filtered.map((component) => (
            <ComponentCard key={component} component={component} previewHtml={previews[component]} />
          ))}
        </ComponentGrid>
      </ComponentsBand>
    </React.Fragment>
  ));
};

export default CategoricalComponentList;
