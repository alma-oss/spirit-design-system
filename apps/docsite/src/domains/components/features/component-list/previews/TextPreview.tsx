import { Text } from '@alma-oss/spirit-web-react';
import React from 'react';

const TextPreview = () => (
  <Text elementType="p" size="medium" fontWeight="regular" UNSAFE_style={{ width: 260, margin: 0 }}>
    The quick brown fox jumps over the lazy dog.
  </Text>
);

export default TextPreview;
