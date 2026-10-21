import { UNSTABLE_DisplayHeading } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const UNSTABLE_DisplayHeadingPreview: PreviewComponent = () => (
  <UNSTABLE_DisplayHeading elementType="h2" size="medium" UNSAFE_style={{ margin: 0 }}>
    Display
  </UNSTABLE_DisplayHeading>
);

UNSTABLE_DisplayHeadingPreview.guides = PREVIEW_GUIDES.HORIZONTAL;

export default UNSTABLE_DisplayHeadingPreview;
