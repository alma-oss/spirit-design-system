import { Divider } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const DividerPreview: PreviewComponent = () => (
  <div style={{ width: 240 }}>
    <Divider />
  </div>
);

DividerPreview.guides = PREVIEW_GUIDES.VERTICAL;

export default DividerPreview;
