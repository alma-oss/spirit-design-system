import { Text } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const TextPreview: PreviewComponent = () => (
  <Text elementType="p" size="medium" fontWeight="regular" UNSAFE_style={{ width: 260, margin: 0 }}>
    The quick brown fox jumps over the lazy dog.
  </Text>
);

TextPreview.guides = PREVIEW_GUIDES.HORIZONTAL;

export default TextPreview;
