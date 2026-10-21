import { EmptyState, EmptyStateSection, Heading, Text } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const EmptyStatePreview: PreviewComponent = () => (
  <EmptyState spacing="space-600" UNSAFE_style={{ width: 280 }}>
    <EmptyStateSection spacing="space-400">
      <Heading elementType="h2" fontWeight="bold" size="xsmall">
        No results
      </Heading>
      <Text fontWeight="regular" size="medium">
        Try changing your search filters.
      </Text>
    </EmptyStateSection>
  </EmptyState>
);

EmptyStatePreview.guides = PREVIEW_GUIDES.VERTICAL;

export default EmptyStatePreview;
