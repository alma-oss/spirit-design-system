import { Heading, Text } from '@alma-oss/spirit-web-react';
import React from 'react';
import { ComponentCard } from '../../../component-card';
import { COMPONENT_CATEGORY_DESCRIPTIONS, fetchComponentsCatalog } from '../../../component-catalog';
import { groupComponentsByCategory } from '../../utils/groupComponentsByCategory';
import { ComponentGrid } from '../ComponentGrid';
import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '../ComponentsBand';

interface CategoricalComponentListProps {
  components: string[];
}

const CategoricalComponentList = ({ components }: CategoricalComponentListProps) => {
  const categories = groupComponentsByCategory(components);

  return categories.map(({ category, components: filtered }) => (
    <React.Fragment key={category}>
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.HEADING}>
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
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.GRID}>
        <ComponentGrid>
          {fetchComponentsCatalog(filtered).map((entry) => (
            <ComponentCard key={entry.name} entry={entry} />
          ))}
        </ComponentGrid>
      </ComponentsBand>
    </React.Fragment>
  ));
};

export default CategoricalComponentList;
