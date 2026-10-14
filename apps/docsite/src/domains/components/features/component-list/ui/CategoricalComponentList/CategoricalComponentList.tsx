import { Heading, Text } from '@alma-oss/spirit-web-react';
import React from 'react';
import { COMPONENT_CATEGORY_DESCRIPTIONS } from '../../model/componentCategories';
import { groupComponentsByCategory } from '../../utils/groupComponentsByCategory';
import { ComponentCard } from '../ComponentCard';
import { ComponentGrid } from '../ComponentGrid';
import { ComponentsBand } from '../ComponentsBand';

interface CategoricalComponentListProps {
  components: string[];
}

const CategoricalComponentList = ({ components }: CategoricalComponentListProps) => {
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
            <ComponentCard key={component} component={component} />
          ))}
        </ComponentGrid>
      </ComponentsBand>
    </React.Fragment>
  ));
};

export default CategoricalComponentList;
