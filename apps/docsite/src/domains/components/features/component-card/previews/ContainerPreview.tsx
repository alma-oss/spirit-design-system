import { Box, Container } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const ContainerPreview: PreviewComponent = () => (
  <Container UNSAFE_style={{ width: 280 }}>
    <Box colorScheme="neutral-subtle" padding="space-600">
      Container
    </Box>
  </Container>
);

ContainerPreview.guides = PREVIEW_GUIDES.VERTICAL;

export default ContainerPreview;
