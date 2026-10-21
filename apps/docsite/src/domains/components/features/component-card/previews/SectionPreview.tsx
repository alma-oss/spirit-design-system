import { Section } from '@alma-oss/spirit-web-react';
import React from 'react';

const SectionPreview = () => (
  <Section
    backgroundColor="primary"
    hasContainer={false}
    paddingY="space-900"
    textAlignment="center"
    UNSAFE_style={{ width: 280 }}
  >
    Section content
  </Section>
);

export default SectionPreview;
