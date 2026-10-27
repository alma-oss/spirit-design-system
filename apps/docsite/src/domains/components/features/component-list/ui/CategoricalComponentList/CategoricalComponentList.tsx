import { Heading, Text } from '@alma-oss/spirit-web-react';
import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components/ui/ComponentsBand';
import React from 'react';
import { ComponentCard } from '../../../component-card';
import type { ComponentCatalogEntry, ComponentCategories } from '../../../component-catalog';
import { groupComponentsByCategory } from '../../utils/groupComponentsByCategory';
import { ComponentGrid } from '../ComponentGrid';

interface CategoricalComponentListProps {
  catalog: ComponentCatalogEntry[];
  categories: ComponentCategories;
}

const CategoricalComponentList = ({ catalog, categories }: CategoricalComponentListProps) => {
  const groups = groupComponentsByCategory(catalog, categories);

  return groups.map(({ category, description, components }) => (
    <React.Fragment key={category}>
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.HEADING}>
        <div style={{ maxWidth: '37rem' }}>
          <Heading elementType="h2" size="small" fontWeight="semibold" marginBottom="space-700">
            {category}
          </Heading>
          <Text elementType="p" size="large" textColor="secondary" marginBottom="space-0">
            {description}
          </Text>
        </div>
      </ComponentsBand>
      <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.GRID}>
        <ComponentGrid>
          {components.map((entry) => (
            <ComponentCard key={entry.name} entry={entry} />
          ))}
        </ComponentGrid>
      </ComponentsBand>
    </React.Fragment>
  ));
};

export default CategoricalComponentList;
