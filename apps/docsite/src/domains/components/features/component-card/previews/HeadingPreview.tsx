import { Heading } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const HeadingPreview: PreviewComponent = () => (
  <Heading elementType="h2" size="medium" fontWeight="semibold">
    Heading
  </Heading>
);

HeadingPreview.guides = PREVIEW_GUIDES.HORIZONTAL;

export default HeadingPreview;
